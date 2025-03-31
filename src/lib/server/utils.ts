import { raiseError } from "$lib/server/errors";
import { API_HOST } from "$env/static/private";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: API_HOST,
  timeout: 1500,
  headers: {
    "Content-Type": "application/json",
  },
});

export const requestWrapped = async (route: string, method: string, token?: string, body?: any) => {
  try {
    const response = await axiosInstance.request({
      url: route,
      method: method,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      data: body,
    });
    console.log(route, response);
    return response;
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
