## 虎彩移动端模板说明

这是基于 vue-cli4 实现的移动端 H5 开发模板，其中包含项目常用的配置及组件封装，可供快速开发使用。

技术栈：vue-cli4 + webpack4 + vant + axios + less + postcss-px2rem

### Node 版本要求

`Vue CLI` 需要 Node.js 8.9 或更高版本 (推荐 8.11.0+)。你可以使用 [nvm](https://github.com/nvm-sh/nvm) 或
[nvm-windows](https://github.com/coreybutler/nvm-windows) 在同一台电脑中管理多个 Node 版本。


### 启动项目

```js
// 安装依赖
npm install

// 本地启动
npm run serve

// 生产打包
npm run build
```


## 配置多环境变量
`package.json` 里的 `scripts` 配置 `serve` `test` `build`，通过 `--mode xxx` 来执行不同环境

- 通过 `npm run serve` 启动本地
- 通过 `npm run build` 打包测试 , 执行 `production`
- 通过 `npm run build:pro` 打包正式 , 执行 `production`
- 通过 `npm run build:dev` 打包正式 , 执行 `development`
- 通过 `npm run build:test` 打包正式 , 执行 `test`

```javascript
"scripts": {
  "serve": "vue-cli-service serve",
  "build": "vue-cli-service build --mode production",
  "build:pro": "vue-cli-service build --mode production",
  "build:dev": "vue-cli-service build --mode development",
  "build:test": "vue-cli-service build --mode test"
}
```

### 多环境变量介绍

&emsp;&emsp;以 `VUE_APP_` 开头的变量，在代码中可以通过 `process.env.VUE_APP_` 访问。  
&emsp;&emsp;比如,`VUE_APP_ENV = 'development'` 通过`process.env.VUE_APP_ENV` 访问。  
&emsp;&emsp;除了 `VUE_APP_*` 变量之外，在你的应用代码中始终可用的还有两个特殊的变量`NODE_ENV` 和`BASE_URL`

在项目根目录中新建`.env.*`

- .env.development 本地开发环境配置

```bash
NODE_ENV='development'
# must start with VUE_APP_
VUE_APP_API_URL = '//dev-api.flytiger.net'

```

- .env.test 测试环境配置

```bash
NODE_ENV='production'
# must start with VUE_APP_
VUE_APP_API_URL = '//test-api.flytiger.net'
```

- .env.production 正式环境配置

```bash
 NODE_ENV='production'
# must start with VUE_APP_
VUE_APP_API_URL = '//api.flytiger.net'
```

这里我们并没有定义很多变量，只定义了基础的 VUE_APP_ENV `development` `test` `production`  
变量我们统一在 `src/config/index.ts` 里进行管理。

## rem 适配方案

项目已经配置好了 `rem` 适配, 下面仅做介绍：

不用担心，项目已经配置好了 `rem` 适配, 下面仅做介绍：

Vant 中的样式默认使用`px`作为单位，如果需要使用`rem`单位，推荐使用以下两个工具:

- [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem) 是一款 `postcss` 插件，用于将单位转化为 `rem`
- [lib-flexible](https://github.com/amfe/lib-flexible) 用于设置 `rem` 基准值

### PostCSS 配置
下面提供了一份基本的 `postcss` 配置，可以在此配置的基础上根据项目需求进行修改

```javascript
// https://github.com/michael-ciniawsky/postcss-load-config
module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8']
    },
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
```

更多详细信息： [vant](https://youzan.github.io/vant/#/zh-CN/quickstart#jin-jie-yong-fa)

## VantUI 组件按需加载
项目采用[Vant 自动按需引入组件 (推荐)](https://youzan.github.io/vant/#/zh-CN/quickstart#fang-shi-yi.-zi-dong-an-xu-yin-ru-zu-jian-tui-jian)下
面安装插件介绍：

[babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 是一款 `babel` 插件，它会在编译过程中将
`import` 的写法自动转换为按需引入的方式

### 安装插件
```bash
npm i babel-plugin-import -D
```

在`babel.config.js` 设置
```javascript
// 对于使用 babel7 的用户，可以在 babel.config.js 中配置
const plugins = [
  [
    'import',
    {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    },
    'vant'
  ]
]
module.exports = {
  presets: [['@vue/cli-plugin-babel/preset', { useBuiltIns: 'usage', corejs: 3 }]],
  plugins
}
```

### 使用组件

项目在 `src/js/vant.ts` 下统一管理组件，用哪个引入哪个，无需在页面里重复引用

```javascript
// 按需全局引入 vant组件
import Vue from 'vue'
import { Button, List, Cell, Tabbar, TabbarItem } from 'vant'
Vue.use(Button)
Vue.use(Cell)
Vue.use(List)
Vue.use(Tabbar).use(TabbarItem)
```

## 全局样式
所有全局样式都在 `@/src/assets/css` 目录下设置
```bash
├── assets
│   ├── css
│   │   ├── reset.css               # 全局样式初始化
│   │   ├── common.css              # 全局通用样式
│   │   └── variables.less          # 全局变量
```
### 自定义 vant-ui 样式

现在我们来说说怎么重写 `vant-ui` 样式。由于 `vant-ui` 的样式我们是在全局引入的，所以你想在某个页面里面覆盖它的样式就不能
加 `scoped`，但你又想只覆盖这个页面的 `vant` 样式，你就可在它的父级加一个 `class`，用命名空间来解决问题。

```css
.about-container {
  /* 你的命名空间 */
  .van-button {
    /* vant-ui 元素*/
    margin-right: 0px;
  }
}
```

### 父组件改变子组件样式 深度选择器

当你子组件使用了 `scoped` 但在父组件又想修改子组件的样式可以 通过 `>>>` 来实现：

```css
<style scoped>
.a >>> .b { /* ... */ }
</style>
```

### 全局变量

引入依赖包
```js
npm i style-resources-loader -D
```

```javascript
module.exports = {
···
	// 引入全局样式，这样使用定义的less变量时，不用每次引入global.less了
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
  },
···
}

function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/css/variables.less'), // 需要全局导入的less
      ],
    })
}
```

## 打包分析
```bash
npm run build -analy
```

## 配置 externals 引入 cdn 资源

CDN 的全称是 `Content Delivery Network`，即内容分发网络。CDN 是构建在网络之上的内容分发网络，依靠部署在各地的边缘服务器，通过中心平台的负载均衡、内容分发、调度等功能模块，使用户就近获取所需内容，降低网络拥塞，提高用户访问响应速度和命中率。CDN 的关键技术主要有内容存储和分发技术。

随着项目越做越大，依赖的第三方 npm 包越来越多，构建之后的文件也会越来越大。再加上又是单页应用，这就会导致在网速较慢或者服务器带宽有限的情况出现长时间的白屏。此时我们可以使用 CDN 的方法，优化网络加载速度。


1、在 `vue.config.js` 配置 externals 属性
```javascript
module.exports = {
 ···
  configureWebpack: (config) => {
    config.externals = {
      'vue': 'Vue',
      'vuex': 'Vuex',
      'vue-router': 'VueRouter',
      'axios': 'axios',
      'vant': 'vant'
    }
  }
```

2、将 `vue、vue-router、vuex、axios` 这些 vue 全家桶的资源，全部改为通过 CDN 链接获取，在 `index.html` 里插入 相应链接。

```javascript
    <!-- 使用CDN的CSS文件 -->
    <% for (var i in
      htmlWebpackPlugin.options.cdn&&htmlWebpackPlugin.options.cdn.css) { %>
      <link href="<%= htmlWebpackPlugin.options.cdn.css[i] %>" rel="preload" as="style" />
      <link href="<%= htmlWebpackPlugin.options.cdn.css[i] %>" rel="stylesheet" />
    <% } %>
     <!-- 使用CDN加速的JS文件，配置在vue.config.js下 -->
    <% for (var i in
      htmlWebpackPlugin.options.cdn&&htmlWebpackPlugin.options.cdn.js) { %>
      <script src="<%= htmlWebpackPlugin.options.cdn.js[i] %>"></script>
    <% } %>
```

## Eslint + Pettier 统一开发规范
VScode 安装 `eslint` `prettier` `vetur` 插件

在文件 `.vscode/settings.json` 里写规则

```bash
  {
    "vetur.format.defaultFormatter.html": "prettier",
    "files.autoSave": "onFocusChange", // 自动保存
    "editor.formatOnSave": true, // 保存时自动匹配
    "editor.tabSize": 4,
    "editor.foldingStrategy": "indentation",
    "editor.minimap.enabled": false, // 禁用编辑器minimap
    "emmet.triggerExpansionOnTab": true, // tab补全
    "emmet.includeLanguages": {
        "vue-html": "html",
        "vue": "html"
    },
    "[javascript]": {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "esbenp.prettier-vscode" //保存时自动规范代码
    },
    "[html]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[css]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[less]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[vue]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    }
  }
```

## vue-router 配置

平时很多人对 vue-router 的配置可配置了 path 和 component，实现了路由跳转即可。其实 vue-router 可做的事情还有很多，比如

- 路由懒加载配置
- 改变单页面应用的 title
- 登录权限校验
- 页面缓存配置

#### 路由懒加载配置

Vue 项目中实现路由按需加载（路由懒加载）的 3 中方式：

```js
// 1、Vue异步组件技术：
{
	path: '/home',
	name: 'Home',
	component: resolve => reqire(['../views/Home.vue'], resolve)
}

// 2、es6提案的import()
{
  path: '/',
  name: 'home',
  component: () => import('../views/Home.vue')
}

// 3、webpack提供的require.ensure()
{
	path: '/home',
	name: 'Home',
	component: r => require.ensure([],() =>  r(require('../views/Home.vue')), 'home')
}
```

本项目采用的是第二种方式，为了后续 webpack 打包优化。

#### 改变单页面应用的 title

由于单页面应用只有一个 html，所有页面的 title 默认是不会改变的，但是我们可以才路由配置中加入相关属性，再在路由守卫中通过 js 改变页面的 title

```js
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
})
```

#### 登录权限校验

在应用中，通常会有以下的场景，比如商城：有些页面是不需要登录即可访问的，如首页，商品详情页等，都是用户在任何情况都能看到的；但是也有是需要登录后才能访问的，如个人中心，购物车等。此时就需要对页面访问进行控制了。

此外，像一些需要记录用户信息和登录状态的项目，也是需要做登录权限校验的，以防别有用心的人通过直接访问页面的 url 打开页面。

此时。路由守卫可以帮助我们做登录校验。具体如下：

1、配置路由的 meta 对象的 auth 属性

```js
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta: { title: '首页', keepAlive: false, auth: false },
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import('../views/mine.vue'),
    meta: { title: '我的', keepAlive: false, auth: true },
  },
]
```

2、在路由首页进行判断。当`to.meta.auth`为`true`(需要登录)，且不存在登录信息缓存时，需要重定向去登录页面

```js
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  const userInfo = sessionStorage.getItem('userInfo') || null
  if (!userInfo && to.meta.auth) {
    next('/login')
  } else {
    next()
  }
})
```

#### 页面缓存配置

项目中，总有一些页面我们是希望加载一次就缓存下来的，此时就用到 keep-alive 了。keep-alive 是 Vue 提供的一个抽象组件，用来对组件进行缓存，从而节省性能，由于是一个抽象组件，所以在 v 页面渲染完毕后不会被渲染成一个 DOM 元素。

1、通过配置路由的 meta 对象的 keepAlive 属性值来区分页面是否需要缓存

```js
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta: { title: '首页', keepAlive: false, auth: false },
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('../views/list.vue'),
    meta: { title: '列表页', keepAlive: true, auth: false },
  },
]
```

2、在 app.vue 做缓存判断

```html
<div id="app">
  <router-view v-if="!$route.meta.keepAlive"></router-view>
  <keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
  </keep-alive>
</div>
```

## gZip 加速优化

所有现代浏览器都支持 gzip 压缩，启用 gzip 压缩可大幅缩减传输资源大小，从而缩短资源下载时间，减少首次白屏时间，提升用户体验。

gzip 对基于文本格式文件的压缩效果最好（如：CSS、JavaScript 和 HTML），在压缩较大文件时往往可实现高达 70-90% 的压缩率，对已经压缩过的资源（如：图片）进行 gzip 压缩处理，效果很不好。

```js
const CompressionPlugin = require('compression-webpack-plugin')
configureWebpack: (config) => {
  if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
      new CompressionPlugin({
        // gzip压缩配置
        test: /\.js$|\.html$|\.css/, // 匹配文件名
        threshold: 10240, // 对超过10kb的数据进行压缩
        deleteOriginalAssets: false, // 是否删除原文件
      })
    )
  }
}
```