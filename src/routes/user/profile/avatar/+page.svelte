<script lang="ts">
  import { fileProxy, superForm } from "sveltekit-superforms/client";
  import { zod } from "sveltekit-superforms/adapters";

  import * as utils from "$lib/utils";
  import LL from "$i18n/i18n-svelte";
  import { changeAvatarSchema } from "$lib/schemas/user/changeAvatar";

  let { data } = $props();

  const { form, errors, message, enhance } = superForm(data.form, {
    validators: zod(changeAvatarSchema),
    validationMethod: "oninput",
    // resetForm: false,
  });

  const avatarFile = fileProxy(form, "avatar_file");
</script>

<form method="POST" enctype="multipart/form-data" use:enhance>
  <fieldset class="fieldset bg-base-200 rounded-box mb-6 p-4">
    <legend class="fieldset-legend">{$LL.user.functions.profile.avatar.change_avatar()}</legend>
    <input
      type="file"
      name="avatar_file"
      bind:files={$avatarFile}
      accept="image/jpeg,image/png"
      class="file-input file-input-primary w-full"
    />
    <p class="fieldset-label {$errors['avatar_file'] ? 'text-error' : ''}">
      {#if $errors["avatar_file"]}
        {#each $errors["avatar_file"] || [] as error}
          <!-- “|| []” 用于规避 svelte 语言服务器的报错 -->
          {utils.getValidationTranslatedStringByKey($LL, error, undefined, "user")}<br />
        {/each}
      {:else}
        &nbsp;
      {/if}
    </p>
  </fieldset>
  <p class="fieldset-label text-error">
    {#if $message}
      {utils.getValidationTranslatedStringByKey($LL, $message, undefined, "user")}
    {/if}
  </p>
  <button type="submit" class="btn btn-primary mb-6">{$LL.common.submit()}</button>
</form>

<!--<SuperDebug data={$form}></SuperDebug>-->
