import type {FormattersInitializer} from 'typesafe-i18n'
import {lowercase, uppercase} from "typesafe-i18n/formatters";
import type {Locales, Formatters} from './i18n-types'

export const initFormatters: FormattersInitializer<Locales, Formatters> = (locale: Locales) => {

    const formatters: Formatters = {
        lowercase,
        // @ts-ignore
        capitalize: (value: string) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    }

    return formatters
}
