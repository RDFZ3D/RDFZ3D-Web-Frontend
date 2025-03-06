import type {BaseTranslation} from "../i18n-types";

const zh_CN = {
    common: {
        optional: "可选",
        validations: {
            too_long: "{field:string|lowercase}至多有 {max_length:number} 个字符",
            too_short: "{field:string|lowercase}至少应有 {min_length:number} 个字符",
            field_invalid: "{field:string|lowercase}无效",
        }
    }
} satisfies BaseTranslation

export default zh_CN;