import { inject, injectable } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { IIntegrationEventRepository } from '../../application/port/integration.event.repository.interface'
import { IQuery } from '../../application/port/query.interface'
import { RepositoryException } from '../../application/domain/exception/repository.exception'
import { IntegrationEvent } from '../../application/integration-event/event/integration.event'
import { IEventBus } from '../port/event.bus.interface'
import { ILogger } from '../../utils/custom.logger'

/**
 * Implementation of the integration event repository.
 *
 * @implements {IIntegrationEventRepository}
 */
@injectable()
export class IntegrationEventRepository implements IIntegrationEventRepository {
    constructor(
        @inject(Identifier.INTEGRATION_EVENT_REPO_MODEL) readonly _integrationEventModel: any,
        @inject(Identifier.RABBITMQ_EVENT_BUS) private readonly _eventBus: IEventBus,
        @inject(Identifier.LOGGER) private readonly _logger: ILogger
    ) {
    }

    public create(item: any): Promise<IntegrationEvent<any>> {
        return new Promise<IntegrationEvent<any>>((resolve, reject) => {
            this._integrationEventModel.create(item)
                .then(result => resolve(result))
                .catch(err => reject(new RepositoryException(err.message, err.description)))
        })
    }

    public find(query: IQuery): Promise<Array<IntegrationEvent<any>>> {
        query.addOrdination('created_at', 'desc')

        const q: any = query.toJSON()
        return new Promise<Array<IntegrationEvent<any>>>((resolve, reject) => {
            this._integrationEventModel.find(q.filters)
                .sort(q.ordination)
                .exec() // execute query
                .then(result => resolve(result))
                .catch(err => reject(new RepositoryException(err.message, err.description)))
        })
    }

    public findOne(query: IQuery): Promise<IntegrationEvent<any>> {
        throw new Error('Not implemented!')
    }

    public update(item: object): Promise<IntegrationEvent<any>> {
        throw new Error('Not implemented!')
    }

    public delete(id: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this._integrationEventModel.findOneAndDelete({ _id: id })
                .exec()
                .then(result => {
                    if (!result) return resolve(false)
                    resolve(true)
                })
                .catch(err => reject(new RepositoryException(err.message, err.description)))
        })
    }

    public count(query: IQuery): Promise<number> {
        throw new Error('Not implemented!')
    }

    public publishEvent(event: IntegrationEvent<any>, routingKey: string): void {
        this._eventBus.publish(event, routingKey)
            .then(() => this._logger
                .info(`Event ${event.event_name} was successfully published on the message bus!`))
            .catch(err => {
                this._logger.warn(`Error publish event: ${event.event_name}. ${err.message}`)
                integrationEvent()
            })

        const integrationEvent = () => {
            const saveEvent: any = event.toJSON()
            this.create({
                ...saveEvent,
                __routing_key: routingKey,
                __operation: 'publish'
            })
                .then(() => this._logger.warn(`Event ${event.event_name} was saved in the database for a possible recovery.`))
                .catch(err => this._logger.error(`There was an error trying to save the event ${event.event_name}.`
                    .concat(`Error: ${err.message}. Event: ${JSON.stringify(saveEvent)}`))
                )
        }
    }
}
