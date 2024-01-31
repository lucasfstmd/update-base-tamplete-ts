import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'
import { FieldToCamelCase } from '../utils/field.to.camel.case'

export class IEValidator {
    /**
     * Validate format /^\d{6,14}$/gi or 'ISENTO'
     * @param {string} ie Value to be validated
     * @param {string} field Field name
     */
    public static validate(field: string, ie: string): void | ValidationException {
        const fieldCamelCase: string = FieldToCamelCase.fieldToCamelCase(field)
        if (typeof ie !== 'string') {
            console.log('not string')
            throw new ValidationException(
                Strings.ERROR_MESSAGE.IE.INVALID_TYPE.MESSAGE
                    .replace('{0}', fieldCamelCase)
                    .replace('{1}', ie),
                Strings.ERROR_MESSAGE.IE.INVALID_TYPE.DESCRIPTION
                    .replace('{0}', fieldCamelCase)
            )
        }
        if (!(/^\d{6,14}$/gi).test(ie) && ie !== 'ISENTO') {
            console.log('not allowed')
            throw new ValidationException(
                Strings.ERROR_MESSAGE.IE.INVALID_VALUE.MESSAGE
                    .replace('{0}', fieldCamelCase)
                    .replace('{1}', ie),
                Strings.ERROR_MESSAGE.IE.INVALID_VALUE.DESCRIPTION
                    .replace('{0}', field)
            )
        }

    }
}
