
import axios, { Method, RawAxiosRequestHeaders, AxiosRequestConfig } from "axios";
import cookies from "js-cookie";
import { ECookies } from "../../types/ECookies";
import { message } from "antd";
export const requestUrl = import.meta.env.VITE_REQUEST_URL; // 请求服务前缀

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
            Authorization: getToken()
        },
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
            url: requestUrl + url,
            ...options,
        }).then(({ data }) => {
            data.status === 200 && resolve(data as T);
        }).catch(({ response }) => {
            message.error(response.data.message);
            reject(response.data.message);
        });
    })
}