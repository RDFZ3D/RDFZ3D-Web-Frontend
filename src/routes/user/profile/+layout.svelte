<script lang="ts">
  import LL from "$i18n/i18n-svelte";

  let { children } = $props();
</script>

<div class="mx-auto flex max-w-4xl flex-row gap-4">
  <ul class="menu bg-base-200 basis-64 self-start">
    <li><a href="info">{$LL.user.functions.profile.info.title()}</a></li>
    <li><a href="auth">{$LL.user.functions.profile.auth_info.title()}</a></li>
  </ul>
  <div class="flex-grow">
    {@render children()}
  </div>
</div>
