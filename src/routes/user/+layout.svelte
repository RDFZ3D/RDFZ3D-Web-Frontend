<script lang="ts">
    import {setLocale} from "$i18n/i18n-svelte";
    let { children, data } = $props();

    // at the very top, set the locale before you access the store and before the actual rendering takes place

    // setLocale(data.locale)
</script>

{@render children()}
