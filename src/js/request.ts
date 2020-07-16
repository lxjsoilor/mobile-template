import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Toast } from 'vant'

const service = axios.create({
	baseURL: `http://${process.env.VUE_APP_API}`, // process.env.NODE_ENV === 'development' ? apiUrl.dev : apiUrl.prod,
	timeout: 3000,
});

export interface MyAxiosRequestConfig extends AxiosRequestConfig {
	type?: string;
}

/**
 * 请求参数处理
 */
service.interceptors.request.use((config: MyAxiosRequestConfig) => {
	return config;
});

/**
 * 响应结果处理
 */
service.interceptors.response.use(
	(response: AxiosResponse) => {
		return Promise.resolve(response.data);
	},
	(error: any) => {
		if (error && error.response) {
			switch (error.response.status) {
				case 401:
					Toast('请求失败原因')
					return;
				case 403:
					Toast('请求失败原因')
					break;
				default:
					Toast('请求失败原因')
					break;
			}
			return Promise.reject(error.response);
		} else {
			return Promise.reject(error);
		}
	},
);

export default service;
