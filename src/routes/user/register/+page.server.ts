import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import {zod} from "sveltekit-superforms/adapters";
import {schema} from "./schema";

// @ts-ignore
import {API_HOST} from "$env/static/private";

export const load = async () => {
  const form = await superValidate(zod(schema));
  return { form };
};

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod(schema));
    if (!form.valid) {
      return fail(400, { form });
    }

    try {
      const response = await fetch(`${API_HOST}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form.data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        return fail(response.status, {
          form,
          error: errorData.detail || '注册过程中发生错误，请稍后重试'
        });
      }

      return { form };
    } catch (error) {
      return fail(500, {
        form,
        error: '注册过程中发生错误，请稍后重试'
      });
    }
  }
};