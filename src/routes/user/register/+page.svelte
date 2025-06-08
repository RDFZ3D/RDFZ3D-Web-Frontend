<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  import { zod } from "sveltekit-superforms/adapters";

  import * as utils from "$lib/utils";
  import LL from "$i18n/i18n-svelte";
  import { registerSchema, type RegisterSchemaKey } from "$lib/schemas/user/register";
  import type { FormFieldsetInfo } from "$lib/schemas/form";

  let { data } = $props();

  const { form, errors, constraints, message, enhance } = superForm(data.form, {
    validators: zod(registerSchema),
  });

  const fields: FormFieldsetInfo<RegisterSchemaKey> = [
    { fieldKey: "username" },
    { fieldKey: "email" },
    { fieldKey: "phone_no" },
    { fieldKey: "password" },
    { fieldKey: "confirm_password" },
  ];
</script>

<form method="POST" use:enhance class="my-6 flex items-center justify-center">
  <fieldset class="fieldset bg-base-200 rounded-box w-xs p-4">
    <legend class="fieldset-legend">{$LL.user.functions.register.title()}</legend>

    {#each fields as field}
      <label class="fieldset-label" for="input-{field.fieldKey}">
        {$LL.user[field.fieldKey]()}
        {$constraints[field.fieldKey]?.required ? "*" : `(${$LL.common.optional()})`}
      </label>
      <input
        class="input {$errors[field.fieldKey] ? 'input-error' : ''}"
        id="input-{field.fieldKey}"
        name={field.fieldKey}
        type={field.fieldKey === "password" || field.fieldKey === "confirm_password"
          ? "password"
          : "text"}
        bind:value={$form[field.fieldKey]}
        placeholder={$LL.user[field.fieldKey]()}
      />
      <p class="fieldset-label {$errors[field.fieldKey] ? 'text-error' : ''}">
        {#if $errors[field.fieldKey]}
          {#each $errors[field.fieldKey] || [] as error}
            <!-- “|| []” 用于规避 svelte 语言服务器的报错 -->
            {utils.getValidationTranslatedStringByKey($LL, error, field.fieldKey, "user")}<br />
          {/each}
        {:else}
          &nbsp;
        {/if}
      </p>
    {/each}
    <p class="fieldset-label text-error">
      {#if $message}
        {utils.getValidationTranslatedStringByKey($LL, $message, undefined, "user")}
      {/if}
    </p>
    <button type="submit" class="btn btn-neutral mt-4">{$LL.user.functions.register.title()}</button
    >
    <a class="link text-right" href="login">{$LL.user.functions.register.links.login()}</a>
  </fieldset>
</form>
