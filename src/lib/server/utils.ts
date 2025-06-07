import { raiseError, ServerError } from "$lib/server/errors";
import { API_HOST } from "$env/static/private";
import axios, { AxiosError } from "axios";
import type { TranslationFunctions } from "$i18n/i18n-types";
import { message } from "sveltekit-superforms/server";

const axiosInstance = axios.create({
  baseURL: API_HOST,
  timeout: 1500,
  headers: {
    "Content-Type": "application/json",
  },
});

//专门用来上传文件的
const axiosInstanceFile = axios.create({
  baseURL: API_HOST,
  timeout: 1500,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const requestWrapped = async (route: string, method: string, token?: string, body?: any) => {
  try {
    return await axiosInstance.request({
      url: route,
      method: method,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      data: body,
    });
  } catch (e) {
    if (!(e instanceof axios.AxiosError)) {
      throw e;
    }
    if (e.response) {
      raiseError(e.response.status, e.response.data.detail);
    }
    throw e;
  }
};

//也是专门用来上传文件的
export const requestWrappedForFile = async (
  route: string,
  method: string,
  token?: string,
  body?: any,
) => {
  console.log(body);
  try {
    return await axiosInstanceFile.request({
      url: route,
      method: method,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      data: body,
    });
  } catch (e) {
    if (!(e instanceof axios.AxiosError)) {
      throw e;
    }
    if (e.response) {
      raiseError(e.response.status, e.response.data.detail);
    }
    throw e;
  }
};

export const returnMessageIfServerError = (e: any, LL: TranslationFunctions, form: any) => {
  if (e instanceof AxiosError) {
    if (e.code === "ECONNREFUSED") {
      return message(form, LL.common.errors.server({ message: "ECONNREFUSED" }), {
        status: 500,
      });
    }
  }
  if (e instanceof ServerError) {
    return message(form, LL.common.errors.server({ message: e.status.toString() }), {
      status: 500,
    });
  }
  return null;
};
