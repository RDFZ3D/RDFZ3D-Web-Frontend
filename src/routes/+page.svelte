<script lang="ts">
  import { pageName } from "$lib/titleStore";
  import { onMount } from "svelte";

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

  // 下载链接和网页端链接
  const downloadUrl = "/download";
  const webUrl = "/web";
  const loginUrl = "/user/login";
  function handleDownload() {
    window.open(downloadUrl, "_blank");
  }
  function handleWeb() {
    window.open(webUrl, "_blank");
  }
</script>

<!--这里背景图片会根据屏幕长宽的比例切换，移动端为竖版图片，桌面端为横板图片-->
<div
  class="flex min-h-screen flex-col items-center justify-center bg-cover bg-center"
  style="background-image: url({isMobile ? '/bg-mobile.png' : '/bg.png'});"
>
  <div class="flex flex-col items-center rounded-xl bg-black/40 p-8 shadow-xl backdrop-blur-sm">
    <h1 class="mb-4 text-4xl font-bold text-white drop-shadow-lg md:text-5xl">人大附中数字校园</h1>
    <p class="mb-8 max-w-xl text-center text-lg text-white drop-shadow">
      人大附中数字校园项目致力于打造1:1真实还原的虚拟校园,为师生提供校园介绍、校园导览、云端相聚等服务。
    </p>
    <div class="mb-2 flex gap-4">
      <button class="btn btn-primary btn-lg shadow-lg" on:click={handleDownload}> 下载 </button>
      <button class="btn btn-primary btn-lg shadow-lg" on:click={handleWeb}> 网页端 </button>
    </div>
    <div class="mt-4 flex w-full justify-center">
      <a
        href={loginUrl}
        class="text-xs text-gray-300 opacity-60 transition select-none hover:underline"
      >
        登录/注册
      </a>
    </div>
  </div>
</div>
