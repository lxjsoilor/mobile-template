import request, { MyAxiosRequestConfig } from '@/js/request';
import { ActionContext } from 'vuex';
const state = {};
const getters = {};
const mutations = {};

type dataType = {
	api: string;
	data: { [key: string]: unknown };
	type: string;
	headers?: { [key: string]: unknown };
};

type fileType = {
	api: string;
	params: { [key: string]: unknown };
	filename: string;
};

const actions = {
	/**
	 * get 方法
	 * @param context
	 * @param args
	 */
	async get(context: ActionContext<any, any>, args: dataType) {
		const { api, data, headers } = args;
		const res = await request.get(api, { params: data, headers });
		return res;
	},
	/**
	 * post 方法
	 * @param context
	 * @param args
	 */
	async post(context: ActionContext<any, any>, args: dataType) {
		const { api, data, type } = args;
		const res = await request.post(api, data, { type } as MyAxiosRequestConfig);
		return res;
	},
	/**
	 * delete 方法
	 * @param context
	 * @param args
	 */
	async delete(context: ActionContext<any, any>, args: dataType) {
		const { api, data, type } = args;
		const res = await request.delete(api + '/' + data.id, { data, type } as MyAxiosRequestConfig);
		return res;
	},
	/**
	 * put 方法
	 * @param context
	 * @param args
	 */
	async put(context: ActionContext<any, any>, args: dataType) {
		const { api, data } = args;
		const res = await request.put(api, data);
		return res;
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
