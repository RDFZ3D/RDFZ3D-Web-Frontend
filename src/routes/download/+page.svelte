<script lang="ts">
  import LL from "$i18n/i18n-svelte";
  // 自动平台检测 key, 名称, 下载链接, 图标 都是从后端返回的
  export let data: {
    // 你的平台对应的版本
    detectedPlatform?: {
      name: string;
      key: string;
      downloadUrl: string;
      icon: string;
    };
    // 不是你的平台的版本
    otherPlatforms: {
      name: string;
      key: string;
      downloadUrl: string;
      icon: string;
    }[];
  };

  // 校验链接合法：有值&不是example.com
  function isValid(url?: string) {
    if (!url) return false;
    try {
      const u = new URL(url);
      if (u.hostname.includes("example.com")) return false;
    } catch {
      return false;
    }
    return true;
  }

  // 过滤自身平台
  $: validDetectedPlatform =
    data.detectedPlatform && isValid(data.detectedPlatform.downloadUrl)
      ? data.detectedPlatform
      : null;

  // 过滤其它平台
  $: validOtherPlatforms = data.otherPlatforms.filter((p) => isValid(p.downloadUrl));
</script>

<div class="container mx-auto max-w-2xl py-14">
  <div class="card bg-base-300/90 shadow-xl">
    <div class="card-body gap-8">
      <h2 class="card-title text-3xl">{$LL.common.download()}</h2>
      {#if validDetectedPlatform}
        <div class="alert bg-base-content/10 border-primary flex items-center gap-3">
          <i class={`text-3xl ${validDetectedPlatform.icon}`}></i>
          <div>
            <div class="font-bold">
              {$LL.download.suggested_by_platform()}
            </div>
            <a
              href={validDetectedPlatform.downloadUrl}
              class="btn btn-primary mt-2 w-full"
              target="_blank"
            >
              {$LL.download.download_version({ platform: validDetectedPlatform.name })}
            </a>
          </div>
        </div>
      {/if}

      {#if validOtherPlatforms.length > 0}
        <details class="bg-base-content/10 collapse">
          <summary class="collapse-title text-lg font-semibold"
            >{$LL.download.other_platforms()}
            ({$LL.common.click_to_unfold()})
          </summary>
          <div class="collapse-content">
            <ul class="space-y-3">
              {#each validOtherPlatforms as platform}
                <li>
                  <div class="flex items-center gap-4">
                    <i class={`text-xl ${platform.icon}`}></i>
                    <span class="font-medium">{platform.name}</span>
                    <a
                      href={platform.downloadUrl}
                      class="btn btn-outline btn-sm ml-auto"
                      target="_blank"
                    >
                      {$LL.common.download()}
                    </a>
                  </div>
                </li>
              {/each}
            </ul>
          </div>
        </details>
      {/if}
    </div>
  </div>
</div>
