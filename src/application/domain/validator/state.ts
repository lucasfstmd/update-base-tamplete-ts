import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'
import { State } from '../utils/state'
import { FieldToCamelCase } from '../utils/field.to.camel.case'

export const STATE_ALLOWED: Array<string> = Object.values(State)

export class StateValidator {
    /**
     * Valid if the state value is within the allowed values.
     * Allowed values are described in the enum {State}
     * @param field
     * @param state
     */
    public static validate(field: string, state: string): void | ValidationException {
        const fieldCamelCase: string = FieldToCamelCase.fieldToCamelCase(field)
        if (!STATE_ALLOWED.includes(state)) {
            throw new ValidationException(
                Strings.ERROR_MESSAGE.STATE.INVALID_VALUE.MESSAGE
                    .replace('{0}', fieldCamelCase)
                    .replace('{1}', state),
                Strings.ERROR_MESSAGE.STATE.INVALID_VALUE.DESCRIPTION
                    .replace('{0}', field)
            )
        }

    }
}
