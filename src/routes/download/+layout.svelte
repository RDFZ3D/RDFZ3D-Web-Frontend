<script lang="ts">
  import LL from "$i18n/i18n-svelte";
  import { pageName } from "$lib/titleStore";

  let { children, data } = $props();

  // at the very top, set the locale before you access the store and before the actual rendering takes place

  // setLocale(data.locale)
  $pageName = $LL.download.title();
</script>

{@render children()}
