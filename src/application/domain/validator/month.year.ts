import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'

export const MONTHS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']

export class MonthYearValidator {
    /**
     * Validate format MMyyyy
     * @param monthYear
     */
    public static validate(monthYear: string): void | ValidationException {

        // Check if the monthYear has a valid format MMyyyy
        if (!(/^\d{6}$/i).test(monthYear)) {
            throw new ValidationException(
                Strings.ERROR_MESSAGE.DATE.INVALID_MONTH_YEAR_FORMAT.MESSAGE.replace('{0}', monthYear),
                Strings.ERROR_MESSAGE.DATE.INVALID_MONTH_YEAR_FORMAT.DESCRIPTION
            )
        }

        // Check if the month has a valid value
        const month = monthYear.substr(0, 2)
        if (!MONTHS.includes(month)) {
            throw new ValidationException(
                Strings.ERROR_MESSAGE.DATE.MONTH_NOT_ALLOWED.MESSAGE.replace('{0}', monthYear),
                Strings.ERROR_MESSAGE.DATE.MONTH_NOT_ALLOWED.DESCRIPTION
            )
        }

        // Check if the year has a valid value
        const year = parseInt(monthYear.substr(2, 4), 10)
        if (year < 1678 || year > 3000) {
            throw new ValidationException(
                Strings.ERROR_MESSAGE.DATE.YEAR_NOT_ALLOWED.MESSAGE.replace('{0}', monthYear),
                Strings.ERROR_MESSAGE.DATE.YEAR_NOT_ALLOWED.DESCRIPTION
            )
        }

    }
}
