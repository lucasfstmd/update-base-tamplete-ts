import { ActivityDeleteEvent } from '../event/activity.delete.event'
import { inject } from 'inversify'
import { Identifier } from '../../../di/identifiers'
import { IActivityService } from '../../port/activity.service.interface'
import { IIntegrationEventHandler } from './integration.event.handler.interface'
import { ValidationException } from '../../domain/exception/validation.exception'
import { Activity } from '../../domain/model/activity'
import { ActivityValidator } from '../../domain/validator/activity.validator'
import { ILogger } from '../../../utils/custom.logger'

export class ActivityDeleteEventHandler implements IIntegrationEventHandler<ActivityDeleteEvent> {

    /**
     * Creates an instance of ActivityDeleteEventHandler.
     *
     * @param {IActivityService} activityService
     * @param _logger
     */
    constructor(
        @inject(Identifier.ACTIVITY_SERVICE) readonly activityService: IActivityService,
        @inject(Identifier.LOGGER) private readonly _logger: ILogger
    ) {
    }

    public handle(event: ActivityDeleteEvent): void {
        try {
            if (!event.activity) {
                throw new ValidationException('Event is not in tehe expected format!', JSON.stringify(event))
            }

            const activity: Activity = new Activity().fromJSON(event.activity)
            ActivityValidator.validate(activity)

            this._logger.info(`Prepare to delete activity from ${activity.id}...`)
            Promise.allSettled([
                this.activityService.remove(activity.id!)
            ]).then(results => {
                for (const result of results) {
                    if (result.status === 'rejected') {
                        this._logger.error(`Error removing activity resource. ${result.reason}`)
                    }
                }
                this._logger.info(`Action for event ${event.event_name} sucessfully performad!`)
            })
        } catch (err: any) {
            this._logger.error(`An error ocurred while attempting `
                .concat(`perform the operation with the ${event.event_name} name event. ${err.message}`)
                .concat(err.description ? ' ' + err.description : ''))
        }
    }
}
