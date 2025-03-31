<script lang="ts">
  import LL from "$i18n/i18n-svelte";
  import { invalidateAll } from "$app/navigation";

  const reloadAndBack = async () => {
    await invalidateAll();
    window.history.back();
  };

  let { data } = $props();

  let countdown = $state(5);
  $effect(() => {
    if (countdown >= 0) {
      setTimeout(() => {
        countdown--;
      }, 1000);
    }
    if (countdown <= 0) {
      reloadAndBack();
    }
  });

  if (data.logoutState) {
    reloadAndBack();
  }
</script>

<div class="text-center">
  <div class="my-12 text-lg">
    {$LL.user.functions.logout[data.logoutState ? "success" : "error"]()}
  </div>
  <button onclick={reloadAndBack} class="btn">
    {$LL.common.back()}
    {#if !data.logoutState}
      ({countdown})
    {/if}
  </button>
</div>
