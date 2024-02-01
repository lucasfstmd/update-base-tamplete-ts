import { inject } from 'inversify'
import { Identifier } from '../../../di/identifiers'
import { IActivityService } from '../../port/activity.service.interface'
import { IIntegrationEventHandler } from './integration.event.handler.interface'
import { ActivitySaveEvent } from '../event/activity.save.event'
import { Activity } from '../../domain/model/activity'
import { ValidationException } from '../../domain/exception/validation.exception'
import { ActivityValidator } from '../../domain/validator/activity.validator'
import { ILogger } from '../../../utils/custom.logger'

export class ActivitySaveEventHandler implements IIntegrationEventHandler<ActivitySaveEvent> {

    /**
     * Creates an instance of ActivityRemoveEventHandler.
     *
     * @param {IActivityService} activityService
     * @param _logger
     */
    constructor(
        @inject(Identifier.ACTIVITY_SERVICE) readonly activityService: IActivityService,
        @inject(Identifier.LOGGER) private readonly _logger: ILogger

    ) {
    }

    public handle(event: ActivitySaveEvent): void {
        try {
            if (!event.activity) {
                throw new ValidationException('Event is not in tehe expected format!', JSON.stringify(event))
            }

            const activity: Activity = new Activity().fromJSON(event.activity)
            ActivityValidator.validate(activity)

            this._logger.info(`Prepare to save activity from ${activity.id}...`)
            Promise.allSettled([
                this.activityService.add(activity)
            ]).then(results => {
                for (const result of results) {
                    if (result.status === 'rejected') {
                        this._logger.error(`Error saving patient resource. ${result.reason}`)
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
