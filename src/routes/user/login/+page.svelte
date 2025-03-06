<!--suppress JSUnresolvedReference -->
<script lang="ts">
    import {superForm} from "sveltekit-superforms/client";
    import {Icon} from "@smui/common";
    import Button from "@smui/button";
    import Paper from "@smui/paper";
    import Textfield from "@smui/textfield";
    import CharacterCounter from "@smui/textfield/character-counter";
    import HelperText from "@smui/textfield/helper-text";
    import TextfieldIcon from "@smui/textfield/icon"
    import {mdiAccount, mdiEmail, mdiLock, mdiPhone} from "@mdi/js";

    import * as utils from "$lib/utils";
    import LL from "$i18n/i18n-svelte";
    import type {LoginSchemaKey} from "$lib/server/user/schema";

    let {data} = $props();

    const {form, errors, constraints, enhance} = superForm(data.form);
</script>

{#snippet formTextfield(fieldKey: LoginSchemaKey, iconSvg: string)}
  <div>
    <!--suppress JSUnusedGlobalSymbols -->
    <Textfield
        value={$form[fieldKey] || ""}
        input$name={fieldKey}
        input$emptyValueNull
        type={fieldKey === "password" ? "password" : "text"}
        label={fieldKey === "username"
            ? `${$LL.user.username()} / ${$LL.user.email()} / ${$LL.user.phone_no()}`
            : $LL.user[fieldKey]()}
        class="w-full"
        invalid={!!$errors[fieldKey]}
        {...utils.prefixKeys($constraints[fieldKey], "input$")}
    >
      {#snippet leadingIcon()}
        <TextfieldIcon class="material-icons">
          <Icon tag="svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d={iconSvg} />
          </Icon>
        </TextfieldIcon>
      {/snippet}
      {#snippet helper()}
        <HelperText persistent
                    validationMsg={!!$errors[fieldKey]}>{$errors[fieldKey] || ($constraints[fieldKey]?.required ? "" : $LL.common.optional())}</HelperText>
        {#if ($constraints[fieldKey]?.maxlength)}
          <CharacterCounter>0 / {$constraints[fieldKey].maxlength}</CharacterCounter>
        {/if}
      {/snippet}
    </Textfield>
  </div>
{/snippet}

<div class="flex items-center justify-center mt-6 mb-6">
  <Paper class="w-full max-w-md p-8" elevation={4}>
    <h1 class="mb-6 text-2xl font-bold text-center">{$LL.user.functions.login.title()}</h1>

    <form method="POST" use:enhance class="space-y-6">
      {@render formTextfield("username", mdiAccount)}
      {@render formTextfield("password", mdiLock)}

      <Button variant="raised" class="w-full" type="submit">{$LL.user.functions.login.submit()}</Button>
    </form>
  </Paper>
</div>
