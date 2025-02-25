<script lang="ts">
    import {z} from 'zod';
    import {superForm} from 'sveltekit-superforms/client';
    import Button from '@smui/button';
    import Paper from '@smui/paper';
    import Textfield from '@smui/textfield';
    import HelperText from '@smui/textfield/helper-text';
    import {mdiAccount, mdiEmail, mdiLock} from '@mdi/js';

    let {data} = $props();

    const {form, errors, enhance} = superForm(data.form);
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-50">
  <Paper class="w-full max-w-md p-8" elevation={4}>
    <h1 class="mb-6 text-2xl font-bold text-center">用户注册</h1>

    <form method="POST" use:enhance class="space-y-6">
      <div>
        <Textfield
            bind:value={$form.username}
            input$name="username"
            label="用户名"
            class="w-full"
            invalid={!!$errors.username}
        >
          {#snippet helper()}
            <HelperText persistent>{$errors.username || '请输入3-20个字符的用户名'}</HelperText>
          {/snippet}
        </Textfield>
      </div>

      <div>
        <Textfield
            bind:value={$form.email}
            input$name="email"
            label="邮箱"
            class="w-full"
            invalid={!!$errors.email}
        >
          {#snippet helper()}
            <HelperText persistent>{$errors.email || '请输入邮箱'}</HelperText>
          {/snippet}
        </Textfield>
      </div>

      <div>
        <Textfield
            bind:value={$form.password}
            input$name="password"
            label="密码"
            type="password"
            class="w-full"
            invalid={!!$errors.password}
        >
          {#snippet helper()}
            <HelperText persistent>{$errors.password || '请输入密码'}</HelperText>
          {/snippet}
        </Textfield>
      </div>

      <div>
        <Textfield
            bind:value={$form.confirmPassword}
            input$name="confirmPassword"
            label="确认密码"
            type="password"
            class="w-full"
            invalid={!!$errors.confirmPassword}
        >
          {#snippet helper()}
            <HelperText persistent>{$errors.confirmPassword || '请重复密码'}</HelperText>
          {/snippet}
        </Textfield>
      </div>

      <Button
          variant="raised"
          class="w-full"
          type="submit"
      >
        注册
      </Button>
    </form>
  </Paper>
</div>

<style>
    :global(.mdc-text-field) {
        width: 100%;
    }
</style>