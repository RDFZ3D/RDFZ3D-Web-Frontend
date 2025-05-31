<script lang="ts">
  import LL from "$i18n/i18n-svelte";
  import { PUBLIC_API_HOST } from "$env/static/public";
  import { onMount } from "svelte";
  import { themeChange } from "theme-change";
  import { Icon, UserCircle } from "svelte-hero-icons";
  import { pageTitle, pageName, appName } from "$lib/titleStore";

  import "../app.css";

  let { children, data } = $props();

  // NOTE: the element that is using one of the theme attributes must be in the DOM on mount
  onMount(() => {
    themeChange(false);
  });
  $appName = $LL.terms.r3d_app();
  $pageName = "";
</script>

<div class="navbar sticky top-0">
  <div class="flex-1">
    <a href="/" class="btn btn-ghost text-primary text-xl">
      <img src="/r3d-logo-red-512.png" alt="RDFZ3D Logo" class="size-9" />{$LL.terms.r3d_app()}</a
    >
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
          <li><a href="/user/profile">{$LL.user.functions.profile.title()}</a></li>
          <li><a href="/user/logout">{$LL.user.functions.logout.title()}</a></li>
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

<div class="container grow">
  {@render children()}
</div>

<footer class="text-base-content bg-base-200 p-10">
  <div class="footer sm:footer-horizontal m-auto max-w-6xl">
    <aside>
      <img src="/r3d-logo-red-512.png" alt="RDFZ3D Logo" class="size-[128px]" />
      <p>
        <b>{$LL.terms.r3d_app()}</b> —— {$LL.terms.r3d_project()}
      </p>
    </aside>
    <nav>
      <h6 class="footer-title">{$LL.main.footer.project_pages.title()}</h6>
      <span>
        {$LL.main.footer.project_pages.bug_report_repo()}:
        <a href="https://gitee.com/annot/huanli-hongbai" target="_blank" class="link">
          {$LL.terms.gitee()}
        </a>
      </span>
      <span>
        {$LL.main.footer.project_pages.frontend_repo()}:
        <a href="https://gitee.com/rogerwang2008/RDFZ3D-Web-Frontend" target="_blank" class="link">
          {$LL.terms.gitee()}
        </a>
        /
        <a href="https://github.com/rogerwang2008/RDFZ3D-Web-Frontend" target="_blank" class="link">
          {$LL.terms.github()}
        </a>
      </span>
      <span>
        {$LL.main.footer.project_pages.backend_repo()}:
        <a href="https://gitee.com/rogerwang2008/RDFZ3D-Backend" target="_blank" class="link">
          {$LL.terms.gitee()}
        </a>
        /
        <a href="https://github.com/rogerwang2008/RDFZ3D-Backend" target="_blank" class="link">
          {$LL.terms.github()}
        </a>
      </span>
      <span class="text-muted">对于不确定从属的 Bug，请一概前往 Bug 反馈仓库提交 Issue。</span>
    </nav>
  </div>
</footer>

<svelte:head>
  <title>{$pageTitle}</title>
</svelte:head>
