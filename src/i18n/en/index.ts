import type {Translation} from '../i18n-types'

const en = {
    common: {
        optional: "Optional",
        validations: {
            too_long: "{field|capitalize} can’t be longer than {max_length} characters." as any,
            too_short: "{field|capitalize} should be at least {min_length} characters." as any,
            field_invalid: "Invalid {field|lowercase}.",
        }
    }
} satisfies Translation

export default en
