import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'
import { MONTHS } from './month.year'

export class DateValidator {
    /**
     * Validate date format and value according to ISO 8601 (yyyy-MM-dd)
     * @param date
     */
    public static validate(date: string): void | ValidationException {
        // Validate date format ISO 8601
        if (!(/^\d{4}-\d{2}-\d{2}$/i).test(date)) {
            throw new ValidationException(Strings.ERROR_MESSAGE.INVALID_DATE_FORMAT.replace('{0}', date),
                Strings.ERROR_MESSAGE.DATE.INVALID_DATE_FORMAT_DESC)
        }

        // Validate day
        // Parse the date parts to integers
        const parts = date.split('-')
        const year = parseInt(parts[0], 10)
        const month = parseInt(parts[1], 10)
        const day = parseInt(parts[2], 10)
        const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

        // Check the ranges year
        if (year < 1678 || year > 2261) {
            throw new ValidationException(
                Strings.ERROR_MESSAGE.DATE.YEAR_NOT_ALLOWED.MESSAGE.replace('{0}', date),
                Strings.ERROR_MESSAGE.DATE.YEAR_NOT_ALLOWED.DESCRIPTION
            )
        }

        // Adjust for leap years
        if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) monthLength[1] = 29

        // Check the range of the month
        if (!MONTHS.includes(parts[1])) {
            throw new ValidationException(
                Strings.ERROR_MESSAGE.DATE.MONTH_NOT_ALLOWED.MESSAGE.replace('{0}', date),
                Strings.ERROR_MESSAGE.DATE.MONTH_NOT_ALLOWED.DESCRIPTION
            )
        }

        // Check the range of the day
        if (!(day > 0 && day <= monthLength[month - 1])) {
            throw new ValidationException(
                Strings.ERROR_MESSAGE.DATE.DAY_NOT_ALLOWED.MESSAGE.replace('{0}', date),
                Strings.ERROR_MESSAGE.DATE.DAY_NOT_ALLOWED.DESCRIPTION.replace('{0}', `1 - ${monthLength[month - 1]}`)
            )
        }
    }
}
