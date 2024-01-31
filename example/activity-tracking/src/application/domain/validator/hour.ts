import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'

export class HourValidator {
    /**
     * Validate hour format and value according to ISO 8601 (hh:mm:ss)
     * @param hour
     */
    public static validate(hour: string): void | ValidationException {
        // Validate hour format ISO 8601
        if (!(/^\d{2}:\d{2}:\d{2}$/i).test(hour)) {
            throw new ValidationException(Strings.ERROR_MESSAGE.HOUR.INVALID_FORMAT.MESSAGE.replace('{0}', hour),
                Strings.ERROR_MESSAGE.HOUR.INVALID_FORMAT.DESCRIPTION)
        }

        // Parse the hour parts to integers
        const parts = hour.split(':')
        const hh = parseInt(parts[0], 10)
        const mm = parseInt(parts[1], 10)
        const ss = parseInt(parts[2], 10)

        // Check the ranges hours
        if (hh < 0 || hh > 23) {
            throw new ValidationException(
                Strings.ERROR_MESSAGE.HOUR.HOUR_NOT_ALLOWED.MESSAGE.replace('{0}', hour),
                Strings.ERROR_MESSAGE.HOUR.HOUR_NOT_ALLOWED.DESCRIPTION
            )
        }

        // Check the ranges minutes
        if (mm < 0 || mm >= 60) {
            throw new ValidationException(
                Strings.ERROR_MESSAGE.HOUR.MINUTE_NOT_ALLOWED.MESSAGE.replace('{0}', hour),
                Strings.ERROR_MESSAGE.HOUR.MINUTE_NOT_ALLOWED.DESCRIPTION
            )
        }

        // Check the ranges seconds
        if (ss < 0 || ss >= 60) {
            throw new ValidationException(
                Strings.ERROR_MESSAGE.HOUR.SECOND_NOT_ALLOWED.MESSAGE.replace('{0}', hour),
                Strings.ERROR_MESSAGE.HOUR.SECOND_NOT_ALLOWED.DESCRIPTION
            )
        }
    }
}
