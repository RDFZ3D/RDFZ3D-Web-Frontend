<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  import { zod4 } from "sveltekit-superforms/adapters";
  import type { TranslationFunctions } from "$i18n/i18n-types";

  import * as utils from "$lib/utils";
  import LL from "$i18n/i18n-svelte";
  import {
    userFullSchema,
    userWritableSchema,
    type UserWritableSchemaKey,
    type UserWritableSchema,
  } from "$lib/schemas/user/user";
  import type { FormInfo } from "$lib/schemas/form";

  let { data } = $props();

  const { form, errors, constraints, message, tainted, isTainted, enhance } = superForm(data.form, {
    validators: zod4(userFullSchema),
    resetForm: false,
  });
  type ExcludePublicKeys<T extends string> = T extends `${infer _}_public` ? never : T;

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

  type BooleanKeys<T> = {
    [K in keyof T]: T[K] extends boolean ? K : never;
  }[keyof T];

  const publicFieldKeyWorkaround = (fieldKey: UserWritableSchemaKey) => {
    return `${fieldKey}_public` as BooleanKeys<UserWritableSchema>;
  };
</script>

<form method="POST" use:enhance>
  {#each fieldsets as fieldset}
    <fieldset class="fieldset bg-base-200 rounded-box mb-6 p-4">
      <legend class="fieldset-legend">{$LL.user.functions.profile[fieldset.title].title()}</legend>

      {#each fieldset.fields as field}
        {@const inputType =
          field.fieldKey === "identity"
            ? "textarea"
            : field.fieldKey === "birthday"
              ? "date"
              : "text"}
        <label class="fieldset-label" for="input-{field.fieldKey}">
          {$LL.user[field.fieldKey]()}
          {$constraints[field.fieldKey]?.required ? "*" : `(${$LL.common.optional()})`}
        </label>
        {#if field.fieldKey === "gender"}
          <!--          <select class='select w-full {$errors[field.fieldKey] ? "select-error" : ""}'-->
          <!--                  id="input-{field.fieldKey}"-->
          <!--                  name={field.fieldKey}-->
          <!--                  bind:value={$form[field.fieldKey]}-->
          <!--          >-->
          <!--            <option value="0">{$LL.user.genders.female()}</option>-->
          <!--            <option value="1">{$LL.user.genders.male()}</option>-->
          <!--            <option value="2">{$LL.user.genders.other()}</option>-->
          <!--          </select>-->
          <div class="flex gap-2">
            <div class="join">
              <input
                type="radio"
                name="gender"
                value={0}
                bind:group={$form.gender}
                aria-label={$LL.user.genders.female()}
                class="join-item btn btn-soft"
              />
              <input
                type="radio"
                name="gender"
                value={1}
                bind:group={$form.gender}
                aria-label={$LL.user.genders.male()}
                class="join-item btn btn-soft"
              />
              <input
                type="radio"
                name="gender"
                value={2}
                bind:group={$form.gender}
                aria-label={$LL.user.genders.other()}
                class="join-item btn btn-soft"
              />
            </div>
            <input
              type="radio"
              name="gender"
              value={null}
              bind:group={$form.gender}
              aria-label={$LL.common.null_()}
              class="btn btn-soft"
            />
          </div>
        {:else if inputType === "textarea"}
          <textarea
            class="textarea w-full {$errors[field.fieldKey] ? 'textarea-error' : ''}"
            id="input-{field.fieldKey}"
            name={field.fieldKey}
            bind:value={$form[field.fieldKey]}
            placeholder={$LL.user[field.fieldKey]()}
            aria-invalid={$errors[field.fieldKey] ? "true" : "false"}
          ></textarea>
        {:else}
          <input
            class="input w-full {$errors[field.fieldKey] ? 'input-error' : ''}"
            id="input-{field.fieldKey}"
            name={field.fieldKey}
            type={inputType}
            bind:value={$form[field.fieldKey]}
            placeholder={$LL.user[field.fieldKey]()}
            aria-invalid={$errors[field.fieldKey] ? "true" : "false"}
          />
        {/if}
        <div class="flex items-start gap-2">
          <p class="fieldset-label flex-1 {$errors[field.fieldKey] ? 'text-error' : ''}">
            {#if $errors[field.fieldKey]}
              {#each $errors[field.fieldKey] as error}
                {utils.getValidationTranslatedStringByKey($LL, error, field.fieldKey, "user")}<br />
              {/each}
            {:else if ($tainted === undefined || !isTainted($tainted[field.fieldKey])) && ((field.fieldKey === "email" && !$form.is_email_verified) || (field.fieldKey === "phone_no" && !$form.is_phone_verified))}
              <span class="text-warning">{$LL.user[field.fieldKey]()}{$LL.user.unverified()}</span>
            {:else}
              &nbsp;
            {/if}
          </p>
          {#if Object.keys(userWritableSchema.shape).includes(`${field.fieldKey}_public`)}
            <label>
              <!-- Workaround: 为了让 page.server.ts 中使用 userPatchSchema 的时候也能正常工作-->
              <!-- html 的机制不会 post 不选的 checkbox，因此需要手动添加 false。由于 checkbox 顺序在后，选中后会覆盖这个 false-->
              <input type="hidden" name="{field.fieldKey}_public" value={false} />
              <input
                type="checkbox"
                class="checkbox"
                id="{field.fieldKey}-public"
                name="{field.fieldKey}_public"
                bind:checked={$form[publicFieldKeyWorkaround(field.fieldKey)]}
              />
              {$LL.user.public()}
            </label>
          {/if}
        </div>
      {/each}

      <!--      <button type="submit" class="btn btn-neutral mt-4">{$LL.user.functions.register.title()}</button>-->
      <!--      <a class="link text-right" href="login">{$LL.user.functions.register.links.login()}</a>-->
    </fieldset>
  {/each}
  <p class="fieldset-label text-error">
    {#if $message}
      {utils.getValidationTranslatedStringByKey($LL, $message, undefined, "user")}
    {/if}
  </p>
  <button type="submit" class="btn btn-primary mb-6">{$LL.common.submit()}</button>
</form>

<!--<SuperDebug data={$form}></SuperDebug>-->
