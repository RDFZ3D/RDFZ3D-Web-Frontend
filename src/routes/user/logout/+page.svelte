<script lang="ts">
    import LL from "$i18n/i18n-svelte";
    import {invalidateAll} from "$app/navigation";

    const reloadAndBack = async () => {
        await invalidateAll();
        window.history.back();
    }

    let {data} = $props();

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
</script>

<div class="text-center">
  <div class="text-lg my-12">{$LL.user.functions.logout[data.logoutState ? 'success' : 'error']()}</div>
  <button onclick={reloadAndBack} class="btn">
    {$LL.common.back()} ({countdown})
  </button>
</div>
