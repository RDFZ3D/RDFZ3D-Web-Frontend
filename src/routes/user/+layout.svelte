<script lang="ts">
  let { children, data } = $props();

  // at the very top, set the locale before you access the store and before the actual rendering takes place

  // setLocale(data.locale)
</script>

{@render children()}
