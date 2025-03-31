import type { Translation } from "../i18n-types";

const en = {
  common: {
    back: "Back",
    confirm: "Confirm",
    submit: "Submit",
    cancel: "Cancel",
    optional: "Optional",
    null_: "Null",
    validations: {
      required: "{field|capitalize} is required." as any,
      too_long: "{field|capitalize} can’t be longer than {max_length} characters." as any,
      too_short: "{field|capitalize} should be at least {min_length} characters." as any,
      field_invalid: "Invalid {field|lowercase}.",
      ascii_only: "Only ASCII characters are allowed in {field|lowercase}.",
      var_name_only: "Only letters, numbers and underscores are allowed in {field|lowercase}.",
    },
    errors: {
      unhandled:
        "Unhandled error: {message}.\nIf this occurs regularly, please submit an issue on GitHub.",
      server:
        "Server error: {message}.\nIf this occurs regularly, please submit an issue on GitHub.",
    },
  },
} satisfies Translation;

export default en;
