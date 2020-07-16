import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

// 获取 modules
const modulesFiles = require.context('./modules', true, /\.ts|.js$/);
const modules = modulesFiles.keys().reduce((modules: any, modulePath) => {
	const moduleName: string = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
	const value = modulesFiles(modulePath);
	modules[moduleName] = value.default;
	return modules;
}, {});

export default new Vuex.Store({
	state: {
		isCollapse: false,
	},
	getters: {
		collapse(state) {
			return state.isCollapse;
		},
	},
	mutations: {
		SET_COLLAPSE(state, isCollapse) {
			state.isCollapse = isCollapse;
		},
	},
	actions: {},
	modules,
});
