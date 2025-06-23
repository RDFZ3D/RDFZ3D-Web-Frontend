<script lang="ts">
  //自动平台检测 key,名称,下载链接,图标 都是从后端返回的
  export let data: {
    //你的平台对应的版本
    detectedPlatform?: {
      name: string;
      key: string;
      downloadUrl: string;
      icon: string;
    };
    //不是你的平台的版本
    otherPlatforms: {
      name: string;
      key: string;
      downloadUrl: string;
      icon: string;
    }[];
  };
</script>

<div class="container mx-auto max-w-2xl py-14">
  <div class="card bg-base-300/90 shadow-xl">
    <div class="card-body">
      <h2 class="card-title mb-4 text-3xl font-bold">软件下载</h2>
      {#if data.detectedPlatform}
        <div class="mb-6">
          <div class="alert bg-base-content/10 border-primary flex items-center gap-3">
            <i class={`text-3xl ${data.detectedPlatform.icon}`}></i>
            <div>
              <div class="font-bold">为你的平台推荐：</div>
              <a href={data.detectedPlatform.downloadUrl} class="btn btn-primary mt-2 w-full">
                下载 {data.detectedPlatform.name} 版本
              </a>
            </div>
          </div>
        </div>
      {/if}

      <div class="mt-6">
        <details class="bg-base-content/10 collapse">
          <summary class="collapse-title text-lg font-semibold"> 其他平台版本(点击展开) </summary>
          <div class="collapse-content">
            <ul class="space-y-3">
              {#each data.otherPlatforms as platform}
                <li>
                  <div class="flex items-center gap-4">
                    <i class={`text-xl ${platform.icon}`}></i>
                    <span class="font-medium">{platform.name}</span>
                    <a href={platform.downloadUrl} class="btn btn-outline btn-sm ml-auto"> 下载 </a>
                  </div>
                </li>
              {/each}
            </ul>
          </div>
        </details>
      </div>
    </div>
  </div>
</div>

<style>
  /* 你可以根据需要自定义样式 */
</style>
