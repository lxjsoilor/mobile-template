<template>
  <div>
    <div class="markdown">
      <h2>虎彩移动端模板说明</h2>
      <p>这是基于 vue-cli4 实现的移动端 H5 开发模板，其中包含项目常用的配置及组件封装，可供快速开发使用。</p>
      <p>技术栈：vue-cli4 + webpack4 + vant + axios + less + postcss-px2rem</p>
      <h3>Node 版本要求</h3>
      <p>
        <code>Vue CLI</code> 需要 Node.js 8.9 或更高版本 (推荐 8.11.0+)。你可以使用
        <a href="https://github.com/nvm-sh/nvm">nvm</a> 或
        <a href="https://github.com/coreybutler/nvm-windows">nvm-windows</a> 在同一台电脑中管理多个 Node 版本。</p>
      <h3>启动项目</h3>
      <pre><code class="language-js">// 安装依赖
  npm install
  
  // 本地启动
  npm run serve
  
  // 生产打包
  npm run build
  </code></pre>
      <h2>配置多环境变量</h2>
      <p>
        <code>package.json</code> 里的
        <code>scripts</code> 配置
        <code>serve</code>
        <code>test</code>
        <code>build</code>，通过
        <code>--mode xxx</code> 来执行不同环境</p>
      <ul>
        <li>通过
          <code>npm run serve</code> 启动本地</li>
        <li>通过
          <code>npm run build</code> 打包测试 , 执行
          <code>production</code>
        </li>
        <li>通过
          <code>npm run build:pro</code> 打包正式 , 执行
          <code>production</code>
        </li>
        <li>通过
          <code>npm run build:dev</code> 打包正式 , 执行
          <code>development</code>
        </li>
        <li>通过
          <code>npm run build:test</code> 打包正式 , 执行
          <code>test</code>
        </li>
      </ul>
      <pre><code class="language-javascript">"scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build --mode production",
    "build:pro": "vue-cli-service build --mode production",
    "build:dev": "vue-cli-service build --mode development",
    "build:test": "vue-cli-service build --mode test"
  }
  </code></pre>
      <h3>多环境变量介绍</h3>
      <p> 以
        <code>VUE_APP_</code> 开头的变量，在代码中可以通过
        <code>process.env.VUE_APP_</code> 访问。
        <br> 比如,
        <code>VUE_APP_ENV = 'development'</code> 通过
        <code>process.env.VUE_APP_ENV</code> 访问。
        <br> 除了
        <code>VUE_APP_*</code> 变量之外，在你的应用代码中始终可用的还有两个特殊的变量
        <code>NODE_ENV</code> 和
        <code>BASE_URL</code>
      </p>
      <p>在项目根目录中新建
        <code>.env.*</code>
      </p>
      <ul>
        <li>.env.development 本地开发环境配置</li>
      </ul>
      <pre><code class="language-bash">NODE_ENV='development'
  # must start with VUE_APP_
  VUE_APP_API_URL = '//dev-api.flytiger.net'
  
  </code></pre>
      <ul>
        <li>.env.test 测试环境配置</li>
      </ul>
      <pre><code class="language-bash">NODE_ENV='production'
  # must start with VUE_APP_
  VUE_APP_API_URL = '//test-api.flytiger.net'
  </code></pre>
      <ul>
        <li>.env.production 正式环境配置</li>
      </ul>
      <pre><code class="language-bash"> NODE_ENV='production'
  # must start with VUE_APP_
  VUE_APP_API_URL = '//api.flytiger.net'
  </code></pre>
      <p>这里我们并没有定义很多变量，只定义了基础的 VUE_APP_ENV
        <code>development</code>
        <code>test</code>
        <code>production</code>
        <br> 变量我们统一在
        <code>src/config/index.ts</code> 里进行管理。</p>
      <h2>rem 适配方案</h2>
      <p>项目已经配置好了
        <code>rem</code> 适配, 下面仅做介绍：</p>
      <p>不用担心，项目已经配置好了
        <code>rem</code> 适配, 下面仅做介绍：</p>
      <p>Vant 中的样式默认使用
        <code>px</code>作为单位，如果需要使用
        <code>rem</code>单位，推荐使用以下两个工具:</p>
      <ul>
        <li>
          <a href="https://github.com/cuth/postcss-pxtorem">postcss-pxtorem</a> 是一款
          <code>postcss</code> 插件，用于将单位转化为
          <code>rem</code>
        </li>
        <li>
          <a href="https://github.com/amfe/lib-flexible">lib-flexible</a> 用于设置
          <code>rem</code> 基准值</li>
      </ul>
      <h3>PostCSS 配置</h3>
      <p>下面提供了一份基本的
        <code>postcss</code> 配置，可以在此配置的基础上根据项目需求进行修改</p>
      <pre><code class="language-javascript">// https://github.com/michael-ciniawsky/postcss-load-config
  module.exports = {
    plugins: {
      autoprefixer: {
        overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome &gt; 31', 'ff &gt; 31', 'ie &gt;= 8']
      },
      'postcss-pxtorem': {
        rootValue: 37.5,
        propList: ['*']
      }
    }
  }
  </code></pre>
      <p>更多详细信息：
        <a href="https://youzan.github.io/vant/#/zh-CN/quickstart#jin-jie-yong-fa">vant</a>
      </p>
      <h2>VantUI 组件按需加载</h2>
      <p>项目采用
        <a href="https://youzan.github.io/vant/#/zh-CN/quickstart#fang-shi-yi.-zi-dong-an-xu-yin-ru-zu-jian-tui-jian">Vant 自动按需引入组件 (推荐)</a>下 面安装插件介绍：</p>
      <p>
        <a href="https://github.com/ant-design/babel-plugin-import">babel-plugin-import</a> 是一款
        <code>babel</code> 插件，它会在编译过程中将
        <code>import</code> 的写法自动转换为按需引入的方式</p>
      <h3>安装插件</h3>
      <pre><code class="language-bash">npm i babel-plugin-import -D
  </code></pre>
      <p>在
        <code>babel.config.js</code> 设置</p>
      <pre><code class="language-javascript">// 对于使用 babel7 的用户，可以在 babel.config.js 中配置
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
  </code></pre>
      <h3>使用组件</h3>
      <p>项目在
        <code>src/js/vant.ts</code> 下统一管理组件，用哪个引入哪个，无需在页面里重复引用</p>
      <pre><code class="language-javascript">// 按需全局引入 vant组件
  import Vue from 'vue'
  import { Button, List, Cell, Tabbar, TabbarItem } from 'vant'
  Vue.use(Button)
  Vue.use(Cell)
  Vue.use(List)
  Vue.use(Tabbar).use(TabbarItem)
  </code></pre>
      <h2>全局样式</h2>
      <p>所有全局样式都在
        <code>@/src/assets/css</code> 目录下设置</p>
      <pre><code class="language-bash">├── assets
  │   ├── css
  │   │   ├── reset.css               # 全局样式初始化
  │   │   ├── common.css              # 全局通用样式
  │   │   └── variables.less          # 全局变量
  </code></pre>
      <h3>自定义 vant-ui 样式</h3>
      <p>现在我们来说说怎么重写
        <code>vant-ui</code> 样式。由于
        <code>vant-ui</code> 的样式我们是在全局引入的，所以你想在某个页面里面覆盖它的样式就不能 加
        <code>scoped</code>，但你又想只覆盖这个页面的
        <code>vant</code> 样式，你就可在它的父级加一个
        <code>class</code>，用命名空间来解决问题。</p>
      <pre><code class="language-css">.about-container {
    /* 你的命名空间 */
    .van-button {
      /* vant-ui 元素*/
      margin-right: 0px;
    }
  }
  </code></pre>
      <h3>父组件改变子组件样式 深度选择器</h3>
      <p>当你子组件使用了
        <code>scoped</code> 但在父组件又想修改子组件的样式可以 通过
        <code>&gt;&gt;&gt;</code> 来实现：</p>
      <pre><code class="language-css">&lt;style scoped&gt;
  .a &gt;&gt;&gt; .b { /* ... */ }
  &lt;/style&gt;
  </code></pre>
      <h3>全局变量</h3>
      <p>引入依赖包</p>
      <pre><code class="language-js">npm i style-resources-loader -D
  </code></pre>
      <pre><code class="language-javascript">module.exports = {
  ···
    // 引入全局样式，这样使用定义的less变量时，不用每次引入global.less了
    chainWebpack: config =&gt; {
      const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
      types.forEach(type =&gt; addStyleResource(config.module.rule('less').oneOf(type)))
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
  </code></pre>
      <h2>打包分析</h2>
      <pre><code class="language-bash">npm run build -analy
  </code></pre>
      <h2>配置 externals 引入 cdn 资源</h2>
      <p>CDN 的全称是
        <code>Content Delivery Network</code>，即内容分发网络。CDN 是构建在网络之上的内容分发网络，依靠部署在各地的边缘服务器，通过中心平台的负载均衡、内容分发、调度等功能模块，使用户就近获取所需内容，降低网络拥塞，提高用户访问响应速度和命中率。CDN 的关键技术主要有内容存储和分发技术。</p>
      <p>随着项目越做越大，依赖的第三方 npm 包越来越多，构建之后的文件也会越来越大。再加上又是单页应用，这就会导致在网速较慢或者服务器带宽有限的情况出现长时间的白屏。此时我们可以使用 CDN 的方法，优化网络加载速度。</p>
      <p>1、在
        <code>vue.config.js</code> 配置 externals 属性</p>
      <pre><code class="language-javascript">module.exports = {
   ···
    configureWebpack: (config) =&gt; {
      config.externals = {
        'vue': 'Vue',
        'vuex': 'Vuex',
        'vue-router': 'VueRouter',
        'axios': 'axios',
        'vant': 'vant'
      }
    }
  </code></pre>
      <p>2、将
        <code>vue、vue-router、vuex、axios</code> 这些 vue 全家桶的资源，全部改为通过 CDN 链接获取，在
        <code>index.html</code> 里插入 相应链接。</p>
      <pre><code class="language-javascript">    &lt;!-- 使用CDN的CSS文件 --&gt;
      &lt;% for (var i in
        htmlWebpackPlugin.options.cdn&amp;&amp;htmlWebpackPlugin.options.cdn.css) { %&gt;
        &lt;link href="&lt;%= htmlWebpackPlugin.options.cdn.css[i] %&gt;" rel="preload" as="style" /&gt;
        &lt;link href="&lt;%= htmlWebpackPlugin.options.cdn.css[i] %&gt;" rel="stylesheet" /&gt;
      &lt;% } %&gt;
       &lt;!-- 使用CDN加速的JS文件，配置在vue.config.js下 --&gt;
      &lt;% for (var i in
        htmlWebpackPlugin.options.cdn&amp;&amp;htmlWebpackPlugin.options.cdn.js) { %&gt;
        &lt;script src="&lt;%= htmlWebpackPlugin.options.cdn.js[i] %&gt;"&gt;&lt;/script&gt;
      &lt;% } %&gt;
  </code></pre>
      <h2>Eslint + Pettier 统一开发规范</h2>
      <p>VScode 安装
        <code>eslint</code>
        <code>prettier</code>
        <code>vetur</code> 插件</p>
      <p>在文件
        <code>.vscode/settings.json</code> 里写规则</p>
      <pre><code class="language-bash">  {
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
  </code></pre>
      <h2>vue-router 配置</h2>
      <p>平时很多人对 vue-router 的配置可配置了 path 和 component，实现了路由跳转即可。其实 vue-router 可做的事情还有很多，比如</p>
      <ul>
        <li>路由懒加载配置</li>
        <li>改变单页面应用的 title</li>
        <li>登录权限校验</li>
        <li>页面缓存配置</li>
      </ul>
      <h4>路由懒加载配置</h4>
      <p>Vue 项目中实现路由按需加载（路由懒加载）的 3 中方式：</p>
      <pre><code class="language-js">// 1、Vue异步组件技术：
  {
    path: '/home',
    name: 'Home',
    component: resolve =&gt; reqire(['../views/Home.vue'], resolve)
  }
  
  // 2、es6提案的import()
  {
    path: '/',
    name: 'home',
    component: () =&gt; import('../views/Home.vue')
  }
  
  // 3、webpack提供的require.ensure()
  {
    path: '/home',
    name: 'Home',
    component: r =&gt; require.ensure([],() =&gt;  r(require('../views/Home.vue')), 'home')
  }
  </code></pre>
      <p>本项目采用的是第二种方式，为了后续 webpack 打包优化。</p>
      <h4>改变单页面应用的 title</h4>
      <p>由于单页面应用只有一个 html，所有页面的 title 默认是不会改变的，但是我们可以才路由配置中加入相关属性，再在路由守卫中通过 js 改变页面的 title</p>
      <pre><code class="language-js">router.beforeEach((to, from, next) =&gt; {
    document.title = to.meta.title
  })
  </code></pre>
      <h4>登录权限校验</h4>
      <p>在应用中，通常会有以下的场景，比如商城：有些页面是不需要登录即可访问的，如首页，商品详情页等，都是用户在任何情况都能看到的；但是也有是需要登录后才能访问的，如个人中心，购物车等。此时就需要对页面访问进行控制了。</p>
      <p>此外，像一些需要记录用户信息和登录状态的项目，也是需要做登录权限校验的，以防别有用心的人通过直接访问页面的 url 打开页面。</p>
      <p>此时。路由守卫可以帮助我们做登录校验。具体如下：</p>
      <p>1、配置路由的 meta 对象的 auth 属性</p>
      <pre><code class="language-js">const routes = [
    {
      path: '/',
      name: 'home',
      component: () =&gt; import('../views/Home.vue'),
      meta: { title: '首页', keepAlive: false, auth: false },
    },
    {
      path: '/mine',
      name: 'mine',
      component: () =&gt; import('../views/mine.vue'),
      meta: { title: '我的', keepAlive: false, auth: true },
    },
  ]
  </code></pre>
      <p>2、在路由首页进行判断。当
        <code>to.meta.auth</code>为
        <code>true</code>(需要登录)，且不存在登录信息缓存时，需要重定向去登录页面</p>
      <pre><code class="language-js">router.beforeEach((to, from, next) =&gt; {
    document.title = to.meta.title
    const userInfo = sessionStorage.getItem('userInfo') || null
    if (!userInfo &amp;&amp; to.meta.auth) {
      next('/login')
    } else {
      next()
    }
  })
  </code></pre>
      <h4>页面缓存配置</h4>
      <p>项目中，总有一些页面我们是希望加载一次就缓存下来的，此时就用到 keep-alive 了。keep-alive 是 Vue 提供的一个抽象组件，用来对组件进行缓存，从而节省性能，由于是一个抽象组件，所以在 v 页面渲染完毕后不会被渲染成一个 DOM 元素。</p>
      <p>1、通过配置路由的 meta 对象的 keepAlive 属性值来区分页面是否需要缓存</p>
      <pre><code class="language-js">const routes = [
    {
      path: '/',
      name: 'home',
      component: () =&gt; import('../views/Home.vue'),
      meta: { title: '首页', keepAlive: false, auth: false },
    },
    {
      path: '/list',
      name: 'list',
      component: () =&gt; import('../views/list.vue'),
      meta: { title: '列表页', keepAlive: true, auth: false },
    },
  ]
  </code></pre>
      <p>2、在 app.vue 做缓存判断</p>
      <pre><code class="language-html">&lt;div id="app"&gt;
    &lt;router-view v-if="!$route.meta.keepAlive"&gt;&lt;/router-view&gt;
    &lt;keep-alive&gt;
      &lt;router-view v-if="$route.meta.keepAlive"&gt;&lt;/router-view&gt;
    &lt;/keep-alive&gt;
  &lt;/div&gt;
  </code></pre>
      <h2>gZip 加速优化</h2>
      <p>所有现代浏览器都支持 gzip 压缩，启用 gzip 压缩可大幅缩减传输资源大小，从而缩短资源下载时间，减少首次白屏时间，提升用户体验。</p>
      <p>gzip 对基于文本格式文件的压缩效果最好（如：CSS、JavaScript 和 HTML），在压缩较大文件时往往可实现高达 70-90% 的压缩率，对已经压缩过的资源（如：图片）进行 gzip 压缩处理，效果很不好。</p>
      <pre><code class="language-js">const CompressionPlugin = require('compression-webpack-plugin')
  configureWebpack: (config) =&gt; {
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
  </code></pre>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
</style>
