<script lang="ts">
  import LL from "$i18n/i18n-svelte";
  import { onMount } from "svelte";
  import { Sun, Moon, SunMoon, CircleUserRound } from "@lucide/svelte";
  import { pageTitle, appName } from "$lib/titleStore";
  import { persisted, type Persisted } from "svelte-persisted-store";

  //.env好像在client不可用，先硬编码api地址了
  const PUBLIC_API_HOST = "https://api.r3d.x-way.work";

  import "../app.css";
  import { onNavigate } from "$app/navigation";

  let { children, data } = $props();

  $appName = $LL.terms.r3d_app();

  const theme: Persisted<"light" | "dark" | ""> = persisted("theme", "");

  const switchTheme = () => {
    if ($theme === "light") {
      $theme = "dark";
    } else if ($theme === "dark") {
      $theme = "";
    } else {
      $theme = "light";
    }
  };

  // NOTE: the element that is using one of the theme attributes must be in the DOM on mount
  onMount(() => {
    theme.subscribe((theme) => {
      document.body.setAttribute("data-theme", theme);
    });
  });

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>

<div class="navbar bg-base-200 sticky top-0 z-1000" style="view-transition-name: header">
  <div class="flex-1">
    <a href="/" class="btn btn-ghost text-primary text-xl">
      <img src="/r3d-logo-red-512.png" alt="RDFZ3D Logo" class="size-9" />{$LL.terms.r3d_app()}</a
    >
  </div>
  <!-- THEME CHANGE -->
  <button class="btn btn-ghost btn-circle flex-none" onclick={switchTheme}>
    {#if $theme === "light"}
      <Sun class="size-6" />
    {:else if $theme === "dark"}
      <Moon class="size-6" />
    {:else}
      <SunMoon class="size-6" />
    {/if}
  </button>

  <!-- USER -->
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
          <CircleUserRound class="size-8" />
        </a>
      </div>
    {/if}
  </div>
</div>

<div class="grow">
  {@render children()}
</div>

<footer class="text-base-content bg-base-200 gap-16 p-10" style="view-transition-name: footer">
  <div class="footer sm:footer-horizontal m-auto max-w-6xl">
    <aside>
      <img src="/r3d-logo-red-512.png" alt="RDFZ3D Logo" class="size-32" />
      <p>
        <b>{$LL.terms.r3d_app()}</b> —— {$LL.terms.r3d_project()}
      </p>
      <p>
        {$LL.terms.r3d_club()}:
        <a href="https://gitee.com/RDFZ3D" target="_blank" class="link">
          {$LL.terms.gitee()}
        </a>
        /
        <a href="https://github.com/RDFZ3D" target="_blank" class="link">
          {$LL.terms.github()}
        </a>
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
        <a href="https://gitee.com/RDFZ3D/RDFZ3D-Web-Frontend" target="_blank" class="link">
          {$LL.terms.gitee()}
        </a>
        /
        <a href="https://github.com/RDFZ3D/RDFZ3D-Web-Frontend" target="_blank" class="link">
          {$LL.terms.github()}
        </a>
      </span>
      <span>
        {$LL.main.footer.project_pages.backend_repo()}:
        <a href="https://gitee.com/RDFZ3D/RDFZ3D-Backend" target="_blank" class="link">
          {$LL.terms.gitee()}
        </a>
        /
        <a href="https://github.com/RDFZ3D/RDFZ3D-Backend" target="_blank" class="link">
          {$LL.terms.github()}
        </a>
      </span>
      <span class="text-muted">对于不确定从属的 Bug，请一概前往 Bug 反馈仓库提交 Issue。</span>
    </nav>
  </div>
  <div class="text-base-content mt-6 text-center text-sm opacity-60">
    <a href="https://beian.miit.gov.cn/" target="_blank" class="link link-hover">
      京 ICP 备 2023 00000001 号
    </a>
  </div>
</footer>

<svelte:head>
  <title>{$pageTitle}</title>
</svelte:head>
