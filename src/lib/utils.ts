import type { TranslationFunctions } from "$i18n/i18n-types";
import type { LocalizedString } from "typesafe-i18n";

export const prefixKeys = (obj: Record<string, any> | undefined, prefix: string) => {
  if (!obj) return {};
  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [`${prefix}${key}`, value]));
};

export const emptyAsNull = (value: any) => {
  if (value === "" || Number.isNaN(value) || value === null || value === undefined) return null;
  return value;
};

type FuncKeys<T> = {
  [K in keyof T]: T[K] extends () => LocalizedString ? K : never;
}[keyof T];
/**
 * Get translated string by key. Only checks validation in LL.
 *
 * This is a workaround of zod + typesafe-i18n.
 * @param LL LL provided by typesafe-i18n
 * @param key Translation key (if started with "|:") or a localized string
 *            (the "| string" sig is only to bypass Svelte’s SHITTY type checking)
 * @param fieldKey Field key of the field to be passed into the translation
 * @param namespace Namespace of the translation
 */
export const getValidationTranslatedStringByKey = <TNamespace extends keyof TranslationFunctions>(
  LL: TranslationFunctions,
  key: `|:${string}` | LocalizedString | string,
  fieldKey?: FuncKeys<TranslationFunctions["common"]> | FuncKeys<TranslationFunctions[TNamespace]>,
  namespace: TNamespace = "common" as TNamespace,
): LocalizedString | undefined => {
  console.log(key, fieldKey, namespace);
  if (!key) return;
  if (!key.startsWith("|:")) {
    return key as LocalizedString;
  }
  const realKey = key.slice(2);

  let field: LocalizedString | "" = "";
  if (fieldKey) {
    if (
      fieldKey in LL.common &&
      LL.common[fieldKey as keyof typeof LL.common] instanceof (() => String)
    ) {
      field = (LL.common[fieldKey as keyof typeof LL.common] as () => LocalizedString)();
    } else if (namespace in LL && fieldKey in LL[namespace as keyof typeof LL]) {
      // @ts-ignore
      field = LL[namespace as keyof typeof LL][fieldKey]();
    }
  }

  if (realKey.startsWith("too_short") && field) {
    const min_length = parseInt(realKey.split(":")[1]);
    return LL.common.validations.too_short({ field, min_length });
  } else if (realKey.startsWith("too_long") && field) {
    const max_length = parseInt(realKey.split(":")[1]);
    return LL.common.validations.too_long({ field, max_length });
  }
  let translationFunction: (...args: any[]) => LocalizedString;
  if (realKey in LL.common.validations) {
    translationFunction = LL.common.validations[realKey as keyof typeof LL.common.validations];
  } else if (namespace in LL && realKey in LL[namespace as keyof typeof LL].validations) {
    // @ts-ignore
    translationFunction = LL[namespace as keyof typeof LL].validations[realKey];
  } else throw new Error(`Validation key ${realKey} not found`);
  console.log(translationFunction);
  return translationFunction({ field });
};
