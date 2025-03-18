<script lang="ts">
    import {mdiAccount} from "@mdi/js";
    import LL from "$i18n/i18n-svelte";
    import {PUBLIC_API_HOST} from '$env/static/public';
    import {onMount} from 'svelte'
    import {themeChange} from 'theme-change'

    import '../app.css';

    let {children, data} = $props();

    // NOTE: the element that is using one of the theme attributes must be in the DOM on mount
    onMount(() => {
        themeChange(false)
    })
</script>

<div class="navbar sticky top-0">
  <div class="flex-1">
    <a href="/" class="btn btn-ghost text-xl text-primary">RDFZ3D</a>
  </div>
  <div class="flex-none">
    {#if data.user}
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img
                alt="User avatar"
                src={`${PUBLIC_API_HOST}${data.user?.avatar_path}`} />
          </div>
        </div>
        <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
        <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <li><a href="/user/me">Profiles</a></li>
          <li><a href="/user/logout">Logout</a></li>
        </ul>
      </div>
    {:else}
      <div class="flex-none">
        <a href="/user/login" aria-label="User Login" class="btn btn-ghost btn-circle">
          <svg class="w-7 h-7 rounded-full" viewBox="0 0 24 24">
            <path fill="currentColor" d={mdiAccount} />
          </svg>
        </a>
      </div>
    {/if}
  </div>
</div>

{@render children()}
