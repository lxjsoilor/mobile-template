// 前端缓存  cookie localStrorage sessionStorage

import Cookies, { CookieAttributes } from 'js-cookie';
import { expireTime, domainHost, CachePrefix } from '@/config';
import { validatenull } from './validate';

/**
 *
 * @param key
 */
export const checkToken = (key: string) => {
	if (!key) {
		throw new Error('没有找到key。');
	}
	if (typeof key === 'object') {
		throw new Error('key不能是一个对象。');
	}
};

/**
 * 获取 token
 * @param key
 */
export const getToken = (key: string) => {
	checkToken(key);
	return Cookies.get(key);
};

/**
 * 设置 token
 * @param key
 * @param token
 * @param options
 */
export const setToken = (key: string, value: string, options?: CookieAttributes) => {
	checkToken(key);
	return Cookies.set(key, value, {
		expires: (options && options.expires) || expireTime,
		path: (options && options.path) || '/',
		domain: (options && options.domain) || domainHost,
	});
};
/**
 * 移除 一个 token
 * @param key
 */
export const removeToken = (key: string, options?: CookieAttributes) => {
	checkToken(key);
	return Cookies.remove(key, {
		expires: (options && options.expires) || expireTime,
		path: (options && options.path) || '/',
		domain: (options && options.domain) || domainHost,
	});
};

export enum CacheTypeEnum {
	local,
	session,
	cookie,
}

export type CacheType = {
	dataType: string;
	content: unknown;
	type: CacheTypeEnum;
	dataTime: number;
};
/**
 * 前端缓存  cookie localStrorage sessionStorage
 */
export const Cache = {
	/**
	 * 设置缓存
	 * @param name 缓存名称
	 * @param content 缓存内容
	 * @param type 缓存类型 默认 local
	 */
	set(name: string, content: unknown, type: CacheTypeEnum = CacheTypeEnum.local) {
		const obj: CacheType = {
			dataType: typeof content,
			content,
			type: type,
			dataTime: new Date().getTime(),
		};
		name = CachePrefix + name;
		if (type == CacheTypeEnum.local) {
			window.localStorage.setItem(name, JSON.stringify(obj));
		} else {
			window.sessionStorage.setItem(name, JSON.stringify(obj));
		}
	},

	/**
	 * 获取缓存内容
	 * @param name
	 */
	get(name: string) {
		let obj: string;
		let cache: CacheType;
		let content: unknown;
		name = CachePrefix + name;
		obj = window.sessionStorage.getItem(name) || '';
		if (validatenull(obj)) obj = window.localStorage.getItem(name) || '';
		if (validatenull(obj)) return;
		try {
			cache = JSON.parse(obj);
		} catch {
			return obj;
		}
		if (cache.dataType == 'string') {
			content = cache.content;
		} else if (cache.dataType == 'number') {
			content = Number(cache.content);
		} else if (cache.dataType == 'boolean') {
			content = eval(cache.content as string);
		} else if (cache.dataType == 'object') {
			content = cache.content;
		}
		return content;
	},
	/**
	 * 移除指定缓存
	 * @param name 缓存名称
	 * @param type 缓存类型 默认 local
	 */
	remove(name: string, type: CacheTypeEnum = CacheTypeEnum.local) {
		name = CachePrefix + name;
		if (type === CacheTypeEnum.local) {
			window.localStorage.removeItem(name);
		} else {
			window.sessionStorage.removeItem(name);
		}
	},
	/**
	 * 清理所有缓存
	 * @param type  缓存类型 默认 local
	 */
	clear(type: CacheTypeEnum = CacheTypeEnum.local) {
		if (type === CacheTypeEnum.local) {
			window.localStorage.clear();
		} else {
			window.sessionStorage.clear();
		}
	},
};
