
import axios, { Method, RawAxiosRequestHeaders, AxiosRequestConfig } from "axios";
import cookies from "js-cookie";
import { ECookies } from "../../types/ECookies";
import { message } from "antd";
const { VITE_PROXY_BASE, VITE_REQUEST_URL } = import.meta.env;
export const requestUrl = VITE_REQUEST_URL; // 请求服务前缀

export function requsetGet<T>(url: string, data?: any) {
    return requset<T>(url, 'GET', data);
}
export function requsetPost<T>(url: string, data?: any) {
    return requset<T>(url, 'POST', data);
}
export function requsetPut<T>(url: string, data?: any) {
    return requset<T>(url, 'PUT', data);
}
export function requsetDelete<T>(url: string) {
    return requset<T>(url, 'DELETE');
}
export function getToken() {
    return cookies.get(ECookies.TOKENCOOKIENAME);
}
export function setToken(token: string) {
    if (!token) throw new Error('token is null');
    return cookies.set(ECookies.TOKENCOOKIENAME, token);
}
export function removeToken(removeKey: string = ECookies.TOKENCOOKIENAME) {
    return cookies.remove(removeKey);
}

function requset<T>(url: string, method: Method, data?: any): Promise<T> {
    const options: AxiosRequestConfig & { headers: RawAxiosRequestHeaders } = {
        headers: {
            // Authorization: getToken(),
            // "Access-Control-Allow-Credentials": "true",
        },
        withCredentials: true,
        method
    };
    switch (method) {
        case 'GET':
            options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            options.params = data;
            break;
        case "PUT":
        case "POST":
            options.headers['Content-Type'] = 'application/json';
            options.data = data;
            break;
    }
    if (!options.headers.Authorization) delete options.headers.Authorization;
    return new Promise((resolve, reject) => {
        axios({
            // url: requestUrl + url,
            baseURL: VITE_PROXY_BASE + url,
            ...options,
        }).then(({ data }) => {
            data.status === 200 && resolve(data as T);
        }).catch(({ response }) => {
            if (response.data.errors) {
                message.error(response.data.errors.map((t: any) => t.msg).join('\n'));
                reject(response.data.errors);
            } else {
                message.error(response.data.message);
                reject(response.data.message);
            }
        });
    })
}