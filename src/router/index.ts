import Vue from 'vue'
import VueRouter, { RouteConfig, Route } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: () => import('@/views/Main.vue'),
    redirect: 'Home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/demo/Home.vue'),
        meta: { title: '首页', keepAlive: false, auth: false, isHome: true }
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/demo/About.vue'),
        meta: { title: '关于我', keepAlive: true, auth: true, isHome: true }
      },
      {
        path: '/details',
        name: 'Details',
        component: () => import('@/views/demo/Details.vue'),
        meta: { title: '详情', keepAlive: true, auth: true }
      }

    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: (): any => ({ y: 0 })
})

router.beforeEach(async (to: Route, from: Route, next: any) => {
  document.title = to.meta.title || '虎彩前端项目模板'
  // const userInfo = sessionStorage.getItem('userInfo') || null
  next()

  // if (!userInfo && to.meta.auth) {
  //   next('/login')
  // } else {
  //   next()
  // }
})


export default router
