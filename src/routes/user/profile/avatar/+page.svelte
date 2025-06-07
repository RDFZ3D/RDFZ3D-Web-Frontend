<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  import { zod } from "sveltekit-superforms/adapters";
  import type { TranslationFunctions } from "$i18n/i18n-types";

  import * as utils from "$lib/utils";
  import LL from "$i18n/i18n-svelte";
  import type { FormInfo } from "$lib/schemas/form";

  let { data } = $props();

  const { form, errors, constraints, message, tainted, isTainted, enhance } = superForm(data.form, {
    resetForm: false,
  });
  type ExcludePublicKeys<T extends string> = T extends `${infer _}_public` ? never : T;

  type BooleanKeys<T> = {
    [K in keyof T]: T[K] extends boolean ? K : never;
  }[keyof T];
</script>

<form method="POST" enctype="multipart/form-data" use:enhance>
  <fieldset class="fieldset bg-base-200 rounded-box mb-6 p-4">
    <legend class="fieldset-legend">更改头像</legend>
    <input
      type="file"
      name="avatar_file"
      accept="image/jpeg,image/png"
      class="block w-full text-sm text-gray-500
                  file:mr-4 file:rounded-md file:border-0
                  file:bg-blue-50 file:px-4
                  file:py-2 file:text-sm
                  file:font-semibold file:text-blue-700
                  hover:file:bg-blue-100"
    />
  </fieldset>
  <p class="fieldset-label text-error">
    {#if $message}
      {utils.getValidationTranslatedStringByKey($LL, $message, undefined, "user")}
    {/if}
  </p>
  <button type="submit" class="btn btn-primary mb-6">{$LL.common.submit()}</button>
</form>

<!--<SuperDebug data={$form}></SuperDebug>-->
