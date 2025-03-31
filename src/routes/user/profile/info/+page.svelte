<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  import { zod } from "sveltekit-superforms/adapters";
  import type { TranslationFunctions } from "$i18n/i18n-types";

  import * as utils from "$lib/utils";
  import LL from "$i18n/i18n-svelte";
  import { userFullSchema, type UserFullSchemaKey } from "$lib/schemas/user/user";
  import type { FormInfo } from "$lib/schemas/form";

  let { data } = $props();

  const { form, errors, constraints, message, enhance } = superForm(data.form, {
    validators: zod(userFullSchema),
  });
  type ExcludePublicKeys<T extends string> = T extends `${infer Prefix}_public` ? never : T;

  const fieldsets: FormInfo<
    keyof TranslationFunctions["user"]["functions"]["profile"],
    Exclude<ExcludePublicKeys<UserFullSchemaKey>, "avatar_path">
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
          ></textarea>
        {:else}
          <input
            class="input w-full {$errors[field.fieldKey] ? 'input-error' : ''}"
            id="input-{field.fieldKey}"
            name={field.fieldKey}
            type={inputType}
            bind:value={$form[field.fieldKey]}
            placeholder={$LL.user[field.fieldKey]()}
          />
        {/if}
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

      <!--      <p class="fieldset-label text-error">-->
      <!--        {#if $message}-->
      <!--          {utils.getValidationTranslatedStringByKey($LL, $message, undefined, "user")}-->
      <!--        {/if}-->
      <!--      </p>-->
      <!--      <button type="submit" class="btn btn-neutral mt-4">{$LL.user.functions.register.title()}</button>-->
      <!--      <a class="link text-right" href="login">{$LL.user.functions.register.links.login()}</a>-->
    </fieldset>
  {/each}
  <button type="submit" class="btn btn-primary mb-6">{$LL.common.submit()}</button>
</form>

<!--<SuperDebug data={$form}></SuperDebug>-->
