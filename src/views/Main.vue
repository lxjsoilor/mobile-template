<template>
  <div>
    <transition name="van-slide-left">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <keep-alive>
      <transition name="van-slide-left">
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </transition>
    </keep-alive>
    
  </div>
</template>
<script>
export default {
  name: 'Main',
  
}
</script>

<style lang="less">
// 路由切换动画
.slide-enter-active, .slide-leave-active {
  transition: all 0.2s;
  z-index: 99;
}

.slide-enter, .slide-leave-to {
  opacity: 0;
  transform: translateX(100%, 0, 0);
  z-index: -1;
}
</style>
