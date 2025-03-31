<script lang="ts">
  import LL from "$i18n/i18n-svelte";
  import { PUBLIC_API_HOST } from "$env/static/public";
  import { onMount } from "svelte";
  import { themeChange } from "theme-change";
  import { Icon, UserCircle } from "svelte-hero-icons";

  import "../app.css";

  let { children, data } = $props();

  // NOTE: the element that is using one of the theme attributes must be in the DOM on mount
  onMount(() => {
    themeChange(false);
  });
</script>

<div class="navbar sticky top-0">
  <div class="flex-1">
    <a href="/" class="btn btn-ghost text-primary text-xl">RDFZ3D</a>
  </div>
  <div class="flex-none">
    {#if data.user}
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img alt="User avatar" src={`${PUBLIC_API_HOST}${data.user?.avatar_path}`} />
          </div>
        </div>
        <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          <li><a href="/user/profile">Profiles</a></li>
          <li><a href="/user/logout">Logout</a></li>
        </ul>
      </div>
    {:else}
      <div class="flex-none">
        <a href="/user/login" aria-label="User Login" class="btn btn-ghost btn-circle">
          <Icon src={UserCircle} solid />
        </a>
      </div>
    {/if}
  </div>
</div>

{@render children()}
