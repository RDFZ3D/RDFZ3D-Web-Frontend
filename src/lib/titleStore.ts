import { derived, writable } from "svelte/store";

export const appName = writable("RDFZ3D");
export const pageName = writable("Home");

export const pageTitle = derived(
  [appName, pageName],
  ([$appName, $pageName]) => `${$pageName}${$pageName ? " - " : ""}${$appName}`,
);
