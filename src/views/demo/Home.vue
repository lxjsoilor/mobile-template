<template>
  <div class="hc-demo">
    <div class="hc-demo-header">
      <img src="../../assets/logo.png" alt="">
      <div class="hc-demo-title">
        虎彩移动端开发项目模板
      </div>
    </div>
    <div class="hc-demo-desc">
      初始化的环境以及功能：
    </div>
    <van-cell @click="handlerJump" is-link v-for="item in list" :key="item" :title="item" />
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  data() {
    return {
      list: [
        'Vue-cli4',
        '配置多环境变量',
        'VantUI 组件按需加载',
        'Less 全局样式',
        'Webpack 4',
        'Vuex 状态管理',
        'Axios 封装及接口管理',
        'Vue-router',
        'Webpack 4 vue.config.js 基础配置',
        '配置 proxy 跨域',
        '配置 alias 别名',
        '配置 打包分析',
        '配置 externals 引入 cdn 资源',
        '去掉 console.log',
        'Eslint+Pettier 统一开发规范'
      ]
    }
  },
  components: {
  },
  methods: {
    handlerJump() {
      this.$router.push('Details')
    }
  }
}
</script>

<style lang="less" scoped>
.hc-demo {
  .hc-demo-header {
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    .hc-demo-title {
      font-size: 24px;
      padding-left: 10px;
    }
    img {
      width: 50px;
    }
  }
  .hc-demo-desc {
    padding: 0 15px @variableTest;
    color: rgba(69, 90, 100, 0.6);
    font-size: 12px;
  }
}
</style>

