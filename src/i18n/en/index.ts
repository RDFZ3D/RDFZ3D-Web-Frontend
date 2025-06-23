import type { Translation } from "../i18n-types";

const en = {
  common: {
    back: "Back",
    confirm: "Confirm",
    submit: "Submit",
    cancel: "Cancel",
    optional: "Optional",
    nav: "Navigation",
    index: "Index",
    null_: "Null",
    download: "Download",
    click_to_unfold: "Click to unfold",
    validations: {
      required: "{field|capitalize} is required." as any,
      too_long: "{field|capitalize} can’t be longer than {max_length} characters." as any,
      too_short: "{field|capitalize} should be at least {min_length} characters." as any,
      field_invalid: "Invalid {field|lowercase}.",
      ascii_only: "Only ASCII characters are allowed in {field|lowercase}.",
      var_name_only: "Only letters, numbers and underscores are allowed in {field|lowercase}.",
      unsupported_file_type: "Unsupported file type.",
      file_too_large: "File size should be less than {max_size}.",
    },
    errors: {
      unhandled:
        "Unhandled error: {message}.\nIf this occurs regularly, please submit an issue on GitHub.",
      server:
        "Server error: {message}.\nIf this occurs regularly, please submit an issue on GitHub.",
    },
  },
  terms: {
    rdfz_full: "The High School Affiliated to Renmin University of China",
    rdfz_short: "RDFZ",
    r3d_app: "Eternal RDFZ",
    r3d_project: "RDFZ Digital Campus Project",
    r3d_club: "RDFZ Digital Campus Club",
    gitee: "Gitee",
    github: "GitHub",
  },
  descriptions: {
    index: "where binary roses never fade,\nand digital dawns guard vows we made.",
  },
} satisfies Translation;

export default en;
