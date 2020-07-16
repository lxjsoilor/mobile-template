import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/css/reset.css'
import './assets/css/markdown.css'
import './assets/css/common.css'
import './assets/css/variables.less'


import './js/plugin.ts'
import './js/FastClick.ts'
import './js/utils.ts'
import './js/vant.ts'
import './js/vconsole.ts'
import * as filters from './js/filter'

// 注入全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, (filters as { [key: string]: Function })[key]);
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
