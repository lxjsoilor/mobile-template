<template>
  <div>
    <router-view></router-view>
    <transition name="van-slide-up">
      <TabBar :data="tabbars" @change="handleChange" v-if="$route.meta.isHome"/>
    </transition>
  </div>
</template>

<script>
import TabBar from '@/components/TabBar/index'
export default {
  components: {
    TabBar
  },
  data() {
    return {
      active: 'home',
      tabbars: [
        {
          title: '首页',
          to: {
            name: 'Home'
          },
          icon: 'home-o'
        },
        {
          title: '关于我',
          to: {
            name: 'About'
          },
          icon: 'user-o'
        }
      ]

    }
  },
  methods: {
    handleChange(v) {
      console.log('tab value:', v)
    }
  }
}
</script>

<style>
</style>
