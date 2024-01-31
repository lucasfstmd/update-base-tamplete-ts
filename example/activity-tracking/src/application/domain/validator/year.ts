import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'

export class YearValidator {
    /**
     * Validate year format and value according to ISO 8601 (yyyy)
     * @param year
     */
    public static validate(year: string): void | ValidationException {
        const yyyy = parseInt(year, 10)
        // Validate date format ISO 8601
        if (!(/^\d{4}$/i).test(year)) {
            throw new ValidationException(Strings.ERROR_MESSAGE.VALIDATE_YEAR.FORMAT.MESSAGE.replace('{0}', yyyy),
                Strings.ERROR_MESSAGE.VALIDATE_YEAR.FORMAT.DESCRIPTION)
        }

        // Check the ranges year
        if (yyyy < 1678 || yyyy > 2261) {
            throw new ValidationException(Strings.ERROR_MESSAGE.VALIDATE_YEAR.VALUE.MESSAGE.replace('{0}', yyyy),
                Strings.ERROR_MESSAGE.VALIDATE_YEAR.VALUE.DESCRIPTION)
        }
    }
}
