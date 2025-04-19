<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  import { zod } from "sveltekit-superforms/adapters";
  import type { TranslationFunctions } from "$i18n/i18n-types";

  import * as utils from "$lib/utils";
  import LL from "$i18n/i18n-svelte";
  import {
    userFullSchema,
    type UserFullSchemaKey,
    type UserWritableSchemaKey,
  } from "$lib/schemas/user/user";
  import type { FormInfo } from "$lib/schemas/form";
  import SuperDebug from "sveltekit-superforms";
  import { changePasswordSchema } from "$lib/schemas/user/changePassword";

  let { data } = $props();

  const { form, errors, constraints, message, tainted, isTainted, enhance } = superForm(data.form, {
    validators: zod(userFullSchema),
    resetForm: false,
  });
  const {
    form: changePasswordForm,
    errors: changePasswordErrors,
    enhance: changePasswordEnhance,
    message: changePasswordMessage,
  } = superForm(data.changePasswordForm, {
    validators: zod(changePasswordSchema),
    resetForm: false,
  });
  type ExcludePublicKeys<T extends string> = T extends `${infer Prefix}_public` ? never : T;

  const changePasswordFieldKeys = ["old_password", "new_password"] as const;
  const fieldsets: FormInfo<
    Exclude<keyof TranslationFunctions["user"]["functions"]["profile"], "title">,
    Exclude<ExcludePublicKeys<UserWritableSchemaKey>, "avatar_path">
  > = [
    {
      title: "info",
      fields: [
        { fieldKey: "nickname" },
        { fieldKey: "real_name" },
        { fieldKey: "gender" },
        { fieldKey: "birthday" },
        { fieldKey: "identity" },
      ],
    },
    {
      title: "auth_info",
      fields: [{ fieldKey: "username" }, { fieldKey: "email" }, { fieldKey: "phone_no" }],
    },
  ];
</script>

<form method="POST" action="?/changePassword" use:changePasswordEnhance>
  <fieldset class="fieldset bg-base-200 rounded-box mb-6 p-4">
    <legend class="fieldset-legend"
      >{$LL.user.functions.profile.auth_info.change_password.title()}</legend
    >
    {#each changePasswordFieldKeys as fieldKey}
      <label class="fieldset-label" for="input-change-password-{fieldKey}">
        {$LL.user[fieldKey]()} *
      </label>
      <input
        class="input w-full {$changePasswordErrors[fieldKey] ? 'input-error' : ''}"
        id="input-change-password-{fieldKey}"
        name={fieldKey}
        type="password"
        bind:value={$changePasswordForm[fieldKey]}
        placeholder={$LL.user[fieldKey]()}
      />
      <p class="fieldset-label {$changePasswordErrors[fieldKey] ? 'text-error' : ''}">
        {#if $changePasswordErrors[fieldKey]}
          {#each $changePasswordErrors[fieldKey] || [] as error}
            <!-- “|| []” 用于规避 svelte 语言服务器的报错 -->
            {utils.getValidationTranslatedStringByKey($LL, error, fieldKey, "user")}<br />
          {/each}
        {:else}
          &nbsp;
        {/if}
      </p>
    {/each}
    <p class="fieldset-label text-error">
      {#if $message}
        {utils.getValidationTranslatedStringByKey($LL, $changePasswordMessage, undefined, "user")}
      {/if}
    </p>
    <button class="btn btn-primary justify-self-start" type="submit">
      {$LL.user.functions.profile.auth_info.change_password.submit()}
    </button>
  </fieldset>
</form>
