import type {Handle, RequestEvent} from '@sveltejs/kit';
import {detectLocale, i18n} from '$i18n/i18n-util';
import {initAcceptLanguageHeaderDetector} from 'typesafe-i18n/detectors';
import {loadAllLocales} from "$i18n/i18n-util.sync";
import {sequence} from "@sveltejs/kit/hooks";
import {deleteSessionTokenCookie, setSessionTokenCookie} from '$lib/server/session/utils';
import { validateSessionToken } from '$lib/server/session/functions';


loadAllLocales();
const L = i18n();


const getPreferredLocale = ({request}: RequestEvent) => {
    // detect the preferred language the user has configured in his browser
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language
    const acceptLanguageDetector = initAcceptLanguageHeaderDetector(request)

    return detectLocale(acceptLanguageDetector)
}


const i18nHandle: Handle = async ({event, resolve}) => {
    const locale = getPreferredLocale(event);
    const LL = L[locale];
    // bind locale and translation functions to current requestWrapped
    event.locals.locale = locale;
    event.locals.LL = LL;

    return resolve(event, {transformPageChunk: ({html}) => html.replace('%lang%', locale)});
};


const authHandle: Handle = async ({event, resolve}) => {
    const token = event.cookies.get("session") ?? null;
    if (token === null) {
        event.locals.user = null;
        event.locals.session = null;
        return resolve(event);
    }

    const { session, user } = await validateSessionToken(token);
    if (session !== null) {
        setSessionTokenCookie(event, token, session.expires);
    } else {
        deleteSessionTokenCookie(event);
    }

    event.locals.session = session;
    event.locals.user = user;
    return resolve(event);
};

export const handle = sequence(i18nHandle, authHandle);

