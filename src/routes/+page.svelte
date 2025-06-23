<script lang="ts">
  import LL from "$i18n/i18n-svelte";
  import { onMount } from "svelte";
  import { pageName } from "$lib/titleStore";

  $pageName = "";

  let isMobile = false;

  // 检查是否为竖屏（移动端）
  function checkMobile() {
    isMobile = window.innerWidth < window.innerHeight;
  }

  onMount(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  });
</script>

<div
  class="flex min-h-[calc(100vh_-_64px)] flex-col items-center justify-center bg-cover bg-center"
  style="background-image: url({isMobile ? '/bg-mobile.png' : '/bg.png'});"
>
  <div class="card bg-neutral/40 text-neutral-content items-center p-16 shadow-xl backdrop-blur-sm">
    <h1 class="mb-5 text-5xl font-extrabold drop-shadow-lg md:text-6xl">{$LL.terms.r3d_app()}</h1>
    <h2 class="mb-6 text-2xl font-bold drop-shadow-lg md:text-3xl">
      {$LL.terms.r3d_project()}
    </h2>
    <p class="mb-8 max-w-xl text-center text-lg whitespace-pre-line drop-shadow">
      {$LL.descriptions.index()}
    </p>
    <div class="mb-6 flex gap-4">
      <a class="btn btn-primary btn-lg shadow-lg" href="/download" target="_blank"
        >{$LL.common.download()}</a
      >
    </div>
    <div class="flex w-full justify-center">
      <a href="/user/login" class="link link-hover opacity-70"> 登录 / 注册 </a>
    </div>
  </div>
</div>
