import { ValidationException } from '../exception/validation.exception'
import { Activity } from '../model/activity'

export class ActivityValidator {
    public static validate(activity: Activity): void | ValidationException {
        const fields: Array<string> = []

        // validate null
        if (!activity.name) fields.push('Name')
        if (!activity.start_time) fields.push('Start time')
        if (!activity.end_time) fields.push('End time')
        if (!activity.duration) fields.push('Duration')
        if (!activity.steps) fields.push('Steps')
        if (!activity.calories) fields.push('Calories')

        if (fields.length > 0) {
            throw new ValidationException('Required fields were not provided...',
                'Activity validation failed: '.concat(fields.join(', ')).concat(' required!'))
        }
    }
}
