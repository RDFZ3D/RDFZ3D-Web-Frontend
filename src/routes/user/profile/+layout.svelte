<script lang="ts">
  import LL from "$i18n/i18n-svelte";

  let { children } = $props();
</script>

<div class="mx-auto flex max-w-4xl flex-col gap-4 md:flex-row">
  <ul
    class="menu menu-horizontal md:menu-vertical bg-base-200 items-center self-start md:basis-64 md:items-stretch"
  >
    <li class="menu-title">{$LL.common.nav()}</li>
    <li><a href="info">{$LL.user.functions.profile.info.title()}</a></li>
    <li><a href="avatar">{$LL.user.functions.profile.avatar.title()}</a></li>
    <li><a href="auth">{$LL.user.functions.profile.auth_info.title()}</a></li>
  </ul>
  <div class="flex-grow">
    {@render children()}
  </div>
</div>
