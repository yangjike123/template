import crypto from 'crypto';
import os from 'os';
import { ICommonPaginatin } from '../../types/common';

export function md5(str: string) {
    return crypto.createHash('md5').update(str).digest('hex')//md5加密;
}
// 排除对象里面不需要的参数字段
export function exclude<T extends object>(object: T, excludes: Array<keyof T>) {
    if (typeof object !== 'object') throw new Error('The value passed is not an object type');
    const result = {} as T;
    for (const key in object) {
        if (excludes.includes(key)) continue;
        result[key] = object[key];
    }
    return result;
}

export function setQueryPayload<T>(object: T & ICommonPaginatin) {
    const newObj = { ...object, offset: 0, limit: 10 };
    newObj.offset = object.current ? Number(object.current) - 1 : 0;
    newObj.limit = object.pageSize ? Number(object.pageSize) : 20;
    for (const key in object) {
        if (['true', 'false'].includes(object[key])) newObj[key] = object[key] === 'true' ? '1' : '0';
        continue;
    }
    return newObj as Omit<T, 'current' | 'pageSize'> & { offset: number, limit: number };
}

type CombineChildrenOptions = {
    id?: string | 'id';
    parentId?: string | 'parentId';
    children?: string | 'children';
}
export function combineChildren<T>(data: T[], options?: CombineChildrenOptions) {
    const defaultOptions: CombineChildrenOptions = { id: 'id', parentId: 'parentId', children: 'children' };
    options && Object.assign(defaultOptions, options);
    const tree: T[] = [];
    const fn = (list: T[]) => {
        for (let index = 0; index < list.length; index++) {
            const item = list[index];
            const findItem = list.find(v => v[defaultOptions.id] === item[defaultOptions.parentId]);
            if (findItem) {
                if (!findItem[defaultOptions.children]) findItem[defaultOptions.children] = [];
                findItem[defaultOptions.children].push(item);
            } else {
                tree.push(item);
            }
        }
        return list;
    }
    fn(data);
    return tree;
}

export function getLocalIpAddress(): string[] {
    const ipAddress = [];
    const networkInterfaces = os.networkInterfaces();
    for (const devName in networkInterfaces) {
        const items = networkInterfaces[devName];
        const iface = items.find(item => item.family === 'IPv4');
        if (iface) ipAddress.push(iface.address);
    }
    return ipAddress;
}