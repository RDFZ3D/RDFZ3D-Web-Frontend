import { loadLocaleAsync, loadNamespaceAsync } from "$i18n/i18n-util.async";
import type { LayoutLoad } from "./$types";
import type { Locales } from "$i18n/i18n-types";
import { setLocale } from "$i18n/i18n-svelte";

export const load: LayoutLoad<{ locale: Locales }> = async ({ data: { locale } }) => {
  await loadLocaleAsync(locale);
  await loadNamespaceAsync(locale, "download");
  setLocale(locale);

  return { locale };
};
