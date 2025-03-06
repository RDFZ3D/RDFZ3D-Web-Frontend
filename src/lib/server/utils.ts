import {raiseError} from "$lib/server/errors";
import {API_HOST} from "$env/static/private";

/**
 * A wrapper for fetch that raises an error if the response is not ok
 * @param route
 * @param method
 * @param token
 * @param body
 */
export const request = async (route: string, method: string, token?: string, body?: any) => {
    const response = await fetch(`${API_HOST}${route}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? {'Authorization': `Bearer ${token}`} : {})
        },
        body: body,
    });
    console.log(route, response)
    const result = await response.json();
    if (!response.ok) {
        raiseError(response.status, result.detail);
    }
    return {response, result};
};
