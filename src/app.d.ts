import {User} from "$lib/server/user";

type Locales = import('$i18n/i18n-types').Locales
type TranslationFunctions = import('$i18n/i18n-types').TranslationFun

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            locale: Locales
            LL: TranslationFunctions
            user: User | null,
            session: Session | null,
        }

        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}

export {};
