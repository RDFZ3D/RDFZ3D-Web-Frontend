import type {BaseTranslation} from "../i18n-types";

const zh_CN = {
    common: {
        back: "返回",
        confirm: "确认",
        cancel: "取消",
        optional: "可选",
        validations: {
            required: "{field:string|lowercase}不能为空",
            too_long: "{field:string|lowercase}至多有 {max_length:number} 个字符",
            too_short: "{field:string|lowercase}至少应有 {min_length:number} 个字符",
            field_invalid: "{field:string|lowercase}无效",
            ascii_only: "{field:string|lowercase}只能包含字母、数字和常用符号",
            var_name_only: "{field:string|lowercase}只能包含字母、数字和下划线",
        },
        errors: {
            unhandled: "异常: {message:string}。\n如果频繁出错，请在 Gitee 或 GitHub 提交 Issue。",
            server: "服务器错误：{message:string}。\n如果频繁出错，请在 Gitee 或 GitHub 提交 Issue。",
        }
    }
} satisfies BaseTranslation

export default zh_CN;