import { inject, injectable } from 'inversify'
import { IBackgroundTask } from '../../application/port/background.task.interface'
import { Identifier } from '../../di/identifiers'
import { IEventBus } from '../../infrastructure/port/event.bus.interface'
import { ActivityDeleteEvent } from '../../application/integration-event/event/activity.delete.event'
import { ActivityDeleteEventHandler } from '../../application/integration-event/handler/activity.delete.event.handler'
import { DIContainer } from '../../di/di'
import { ILogger } from '../../utils/custom.logger'

@injectable()
export class SubscribeEventBusTask implements IBackgroundTask {
    constructor(
        @inject(Identifier.RABBITMQ_EVENT_BUS) private readonly _eventBus: IEventBus,
        @inject(Identifier.LOGGER) private readonly _logger: ILogger
    ) {
    }

    public run(): void {
        this.subscribeEvents()
    }

    public async stop(): Promise<void> {
        try {
            await this._eventBus.dispose()
        } catch (err: any) {
            return Promise.reject(new Error(`Error stopping SubscribeEventBusTask! ${err.message}`))
        }
    }

    /**
     *  Before performing the subscribe is trying to connect to the bus.
     *  If there is no connection, infinite attempts will be made until
     *  the connection is established successfully. Once you have the
     *  connection, events subscribe is performed.
     */
    private subscribeEvents(): void {
        this._eventBus
            .subscribe(new ActivityDeleteEvent(), new ActivityDeleteEventHandler(
                DIContainer.get(Identifier.ACTIVITY_SERVICE),
                this._logger
            ),
                ActivityDeleteEvent.ROUTING_KEY
            )
            .then((result: boolean) => {
                if (result) this._logger.info('Subscribe in ActivityDeleteEvent successful!')
            })
            .catch(err => {
                this._logger.error(`Error in Subscribe Activity! ${err.message}`)
            })
    }
}
