import { MONTHS } from '../application/domain/validator/month.year'

/**
 * Class that defines variables with default values.
 *
 * @see Variables defined in .env will have preference.
 * @see Be careful not to put critical data in this file as it is not in .gitignore.
 * Sensitive data such as database, passwords and keys should be stored in secure locations.
 *
 * @abstract
 */
export abstract class Strings {
    public static readonly APP: any = {
        TITLE: 'DATA CROSS API',
        APP_DESCRIPTION: 'Service responsible for performing the data management.'
    }

    public static readonly PARAMETERS: any = {
        COULD_NOT_BE_UPDATED: 'Some fields could not be updated...'
    }

    public static readonly ENUM_VALIDATOR: any = {
        NOT_MAPPED: 'Values not mapped for {0}',
        NOT_MAPPED_DESC: 'The mapped values are: {0}'
    }

    public static readonly USER: any = {
        EMAIL_ALREADY_REGISTERED: 'A user with this email already registered!',
        NOT_FOUND: 'User not found!',
        NOT_FOUND_DESCRIPTION: 'User not found or already removed. A new operation for the same resource is required!',
        PASSWORD_NOT_MATCH: 'Password does not match!',
        PASSWORD_NOT_MATCH_DESCRIPTION: 'The old password parameter does not match with the actual user password.',
        PARAM_ID_NOT_VALID_FORMAT: 'Parameter {user_id} is not in valid format!'
    }

    public static readonly ADMIN: any = {
        NOT_FOUND: 'Admin not found!',
        NOT_FOUND_DESCRIPTION: 'Admin not found or already removed. A new operation for the same resource is required.'
    }

    public static readonly AUDITOR: any = {
        NOT_FOUND: 'Caregiver not found!',
        NOT_FOUND_DESCRIPTION: 'Caregiver not found or already removed. A new operation for the same resource is required.',
        PARAM_ID_NOT_VALID_FORMAT: 'Parameter {caregiver_id} is not in valid format!'
    }

    public static readonly FILE: any = {
        ALREADY_REGISTERED: 'File already registered!'
    }

    public static readonly CONTRIBUTOR: any = {
        ALREADY_REGISTERED: 'Contributor already registered!'
    }

    public static readonly ERROR_MESSAGE: any = {
        UNEXPECTED: 'An unexpected error has occurred. Please try again later...',
        UUID_NOT_VALID_FORMAT: 'Some ID provided does not have a valid format!',
        UUID_NOT_VALID_FORMAT_DESC: 'A 24-byte hex ID similar to this: 507f191e810c19729de860ea is expected.',
        PARAMETER_COULD_NOT_BE_UPDATED: 'This parameter could not be updated.',
        OPERATION_CANT_BE_COMPLETED: 'The operation could not be performed successfully.',
        OPERATION_CANT_BE_COMPLETED_DESC: 'Probably one or more of the request parameters are incorrect.',
        INTERNAL_SERVER_ERROR: 'An internal server error has occurred.',
        INTERNAL_SERVER_ERROR_DESC: 'Check all parameters of the operation being requested.',
        INVALID_FIELDS: 'One or more request fields are invalid...',
        INTEGER_GREATER_ZERO: '{0} must be an integer greater than zero.',
        NUMBER_GREATER_ZERO: '{0} must be a number greater than zero.',
        INVALID_DATE_FORMAT: 'Date: {0}, is not in valid ISO 8601 format.',
        INVALID_DATE_FORMAT_DESC: 'Date must be in the format: yyyy-MM-dd',
        INVALID_DATETIME_FORMAT: 'Datetime: {0}, is not in valid ISO 8601 format.',
        INVALID_DATETIME_FORMAT_DESC: 'Datetime must be in the format: yyyy-MM-ddTHH:mm:ssZ',
        VALIDATE: {
            REQUIRED_FIELDS: 'Required fields were not provided...',
            REQUIRED_FIELDS_DESC: '{0} are required!',
            UUID_NOT_VALID_FORMAT: 'Some ID provided does not have a valid format!',
            UUID_NOT_VALID_FORMAT_DESC: 'A 24-byte hex ID similar to this: 507f191e810c19729de860ea is expected.',
            INVALID_FIELDS: 'One or more request fields are invalid...',
            INVALID_STRING: '{0} must be a string!',
            INVALID_NUMBER: '{0} must be a number!',
            EMPTY_STRING: '{0} must have at least one character!',
            INTEGER_GREATER_ZERO: '{0} must be an integer greater than zero.',
            NUMBER_GREATER_ZERO: '{0} must be a number greater than zero.',
            INVALID_DATA_TYPES_DESC: 'The data_types array must contain at least one element.',
            IMAGE_FORMAT_DESC: 'The image format must be jpg, jpeg or png.',
            IMAGE_SIZE_TOO_LARGE: 'The image size must be equal to or less than 500kb.'
        },
        DATE: {
            YEAR_NOT_ALLOWED: {
                MESSAGE: 'Date {0} has year not allowed.',
                DESCRIPTION: `The year must be greater than 1678 and less than 3000.`
            },
            MONTH_NOT_ALLOWED: {
                MESSAGE: 'Date {0} has month not allowed.',
                DESCRIPTION: `The month must be a value between ${MONTHS.join(', ')}`
            },
            DAY_NOT_ALLOWED: {
                MESSAGE: 'Date {0} has month not allowed.',
                DESCRIPTION: `The day must be a value between {0}.`
            },
            INVALID_MONTH_YEAR_FORMAT: {
                MESSAGE: 'Month year: {0}, is not in valid format.',
                DESCRIPTION: 'Month year must follow MMyyyy format.'
            }
        },
        HOUR: {
            INVALID_FORMAT: {
                MESSAGE: 'Hour: {0}, is not in valid ISO 8601 format.',
                DESCRIPTION: `Hour must be in the format: hh:mm:ss`
            },
            HOUR_NOT_ALLOWED: {
                MESSAGE: 'Hour {0} has hour not allowed.',
                DESCRIPTION: `The hour must be greater than 0 and less than 24.`
            },
            MINUTE_NOT_ALLOWED: {
                MESSAGE: 'Hour {0} has hour not allowed.',
                DESCRIPTION: `The minutes must be greater than 0 and less than 60.`
            },
            SECOND_NOT_ALLOWED: {
                MESSAGE: 'Hour {0} has hour not allowed.',
                DESCRIPTION: `The seconds must be greater than 0 and less than 60.`
            }
        },
        IDENTIFIER: {
            INVALID_FORMAT: {
                MESSAGE: 'Identifier: {0}, is not in valid format.',
                DESCRIPTION: 'The identifier must follow the format ddd, where d is a digit between [0-9].'
            }
        },
        IE: {
            INVALID_TYPE: {
                MESSAGE: '{0}: {1}, is not in valid type.',
                DESCRIPTION: `{0} must be of type string and follow the format ^\d{6,14}$ or 'ISENTO' , where d is a digit between [0-9]`
            },
            INVALID_VALUE: {
                MESSAGE: '{0}: {1}, is not in valid value.',
                DESCRIPTION: `The {0} must follow the format ^\d{6,14}$ or 'ISENTO' , where d is a digit between [0-9].`
            }
        },
        ZIP_CODE: {
            INVALID_FORMAT: {
                MESSAGE: 'Zip Code: {0}, is not in valid format.',
                DESCRIPTION: 'The zip_code must follow the format ^\d{8}$, where d is a digit between [0-9].'
            }
        },
        PRODUCT: {
            INVALID_FORMAT: {
                MESSAGE: 'Product: {0}, is not in valid value.',
                DESCRIPTION: `The product must follow the format ^d{0,5}$, where d is a digit between [0-9].`
            }
        },
        VALIDATE_YEAR: {
            FORMAT: {
                MESSAGE: 'Year: {0}, is not in valid ISO 8601 format.',
                DESCRIPTION: 'Year must be in the format: yyyy.'
            },
            VALUE: {
                MESSAGE: 'Year: {0}, is not in valid ISO 8601 format.',
                DESCRIPTION: 'The value must be between 1678 and 2261.'
            }
        },
        VALIDATE_PRODUCT: {
            MESSAGE: '{0} is not a product type.',
            DESCRIPTION: 'Options are {0}.'
        },
        VALIDATE_STANDART_TYPE: {
            MESSAGE: '{0} is not a standart type.',
            DESCRIPTION: 'Options are {0}.'
        }
    }

    /**
     * @param param
     * @returns
     */
    public static stringsException(param: string) {
        return {
            ALREADY_REGISTERED: `A ${param.toLowerCase()} already registered!`,
            NOT_FOUND: `${param} not found!`,
            NOT_FOUND_DESCRIPTION: `${param} not found or already removed. A new operation for the same resource is required!`
        }
    }
}
