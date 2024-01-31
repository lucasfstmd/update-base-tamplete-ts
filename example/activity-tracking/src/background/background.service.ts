import { inject, injectable } from 'inversify'
import { Identifier } from '../di/identifiers'
import { IConnectionDB } from '../infrastructure/port/connection.db.interface'
import { Default } from '../utils/default'
import { IBackgroundTask } from '../application/port/background.task.interface'
import { Config } from '../utils/config'
import { ILogger } from '../utils/custom.logger'
import { IEventBus } from '../infrastructure/port/event.bus.interface'

@injectable()
export class BackgroundService {

    constructor(
        @inject(Identifier.MONGODB_CONNECTION) private readonly _mongodb: IConnectionDB,
        @inject(Identifier.RABBITMQ_EVENT_BUS) private readonly _eventBus: IEventBus,
        @inject(Identifier.LOGGER) private readonly _logger: ILogger,
        @inject(Identifier.PUBLISH_EVENT_BUS_TASK) private readonly _publishTask: IBackgroundTask,
        @inject(Identifier.SUBSCRIBE_EVENT_BUS_TASK) private readonly _subscribeTask: IBackgroundTask,
        @inject(Identifier.RPC_SERVER_EVENT_BUS_TASK) private readonly _rpcServerTask: IBackgroundTask,
        @inject(Identifier.REGISTER_SETTINGS_TASK) private readonly _registerSettingsTask: IBackgroundTask
    ) {
    }

    public async startServices(): Promise<void> {
        try {
            /**
             * At the time the application goes up, an event is issued if the
             * database is connected, and in this case, the background tasks will run
             */
            await this._registerSettingsTask.run()

            /**
             * Trying to connect to mongodb.
             * Go ahead only when the run is resolved.
             * Since the application depends on the database connection to work.
             */
            await this._mongodb.tryConnect(BackgroundService.getDBUri())

            this._startTasks()
        } catch (err: any) {
            return Promise.reject(new Error(`Error initializing services in background! ${err?.message}`))
        }
    }

    public async stopServices(): Promise<void> {
        try {
            await this._mongodb.dispose()
        } catch (err: any) {
            return Promise.reject(new Error(`Error stopping services in background! ${err?.message}`))
        }
    }

    private _startTasks(): void {
        const rabbitConfigs = Config.getRabbitConfig()
        this._eventBus
            .connectionSub
            .open(rabbitConfigs.uri, rabbitConfigs.options)
            .then((conn) => {
                this._logger.info('Subscribe connection established!')

                conn.on('disconnected', () => this._logger.warn('Subscribe connection has been lost...'))
                conn.on('reestablished', () => this._logger.info('Subscribe connection re-established!'))

                this._subscribeTask.run()
            })
            .catch(err => {
                this._logger.error(`Error trying to get connection to Event Bus for event subscribing. ${err.message}`)
            })

        this._eventBus
            .connectionPub
            .open(rabbitConfigs.uri, rabbitConfigs.options)
            .then((conn) => {
                this._logger.info('Publish connection established!')

                conn.on('disconnected', () => this._logger.warn('Publish connection has been lost...'))
                conn.on('reestablished', () => {
                    this._logger.info('Publish connection re-established!')
                    // When the connection has been lost and reestablished the task will be executed again
                    this._publishTask.run()
                })

                this._publishTask.run()
            })
            .catch(err => {
                this._logger.error(`Error trying to get connection to Event Bus for event publishing. ${err.message}`)
            })

        this._eventBus
            .connectionRpcServer
            .open(rabbitConfigs.uri, rabbitConfigs.options)
            .then((conn) => {
                this._logger.info('RPC Server connection established!')

                conn.on('disconnected', () => this._logger.warn('RPC Server connection has been lost...'))
                conn.on('reestablished', () => this._logger.info('RPC Server connection re-established!'))

                this._rpcServerTask.run()
            })
            .catch(err => {
                this._logger.error(`Error trying to get connection to Event Bus for RPC Server. ${err.message}`)
            })

        this._eventBus
            .connectionRpcClient
            .open(rabbitConfigs.uri, rabbitConfigs.options)
            .then((conn) => {
                this._logger.info('RPC Client connection established!')

                conn.on('disconnected', () => this._logger.warn('RPC Client connection has been lost...'))
                conn.on('reestablished', () => this._logger.info('RPC Client connection re-established!'))
            })
            .catch(err => {
                this._logger.error(`Error trying to get connection to Event Bus for RPC Client. ${err.message}`)
            })

    }


    /**
     * Retrieve the URI for connection to MongoDB.
     *
     * @return {string}
     */
    private static getDBUri(): string {
        if (process.env.NODE_ENV && process.env.NODE_ENV === 'test') {
            return process.env.MONGODB_URI_TEST || Default.MONGODB_URI_TEST
        }
        return process.env.MONGODB_URI || Default.MONGODB_URI
    }
}
