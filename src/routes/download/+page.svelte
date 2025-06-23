<script lang="ts">
  import LL from "$i18n/i18n-svelte";
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
    <div class="card-body gap-8">
      <h2 class="card-title text-3xl">{$LL.common.download()}</h2>
      {#if data.detectedPlatform}
        <div class="alert bg-base-content/10 border-primary flex items-center gap-3">
          <i class={`text-3xl ${data.detectedPlatform.icon}`}></i>
          <div>
            <div class="font-bold">
              {$LL.download.suggested_by_platform()}
            </div>
            <a href={data.detectedPlatform.downloadUrl} class="btn btn-primary mt-2 w-full">
              {$LL.download.download_version({ platform: data.detectedPlatform.name })}
            </a>
          </div>
        </div>
      {/if}

      <details class="bg-base-content/10 collapse">
        <summary class="collapse-title text-lg font-semibold"
          >{$LL.download.other_platforms()}
          ({$LL.common.click_to_unfold()})
        </summary>
        <div class="collapse-content">
          <ul class="space-y-3">
            {#each data.otherPlatforms as platform}
              <li>
                <div class="flex items-center gap-4">
                  <i class={`text-xl ${platform.icon}`}></i>
                  <span class="font-medium">{platform.name}</span>
                  <a href={platform.downloadUrl} class="btn btn-outline btn-sm ml-auto">
                    {$LL.common.download()}
                  </a>
                </div>
              </li>
            {/each}
          </ul>
        </div>
      </details>
    </div>
  </div>
</div>
