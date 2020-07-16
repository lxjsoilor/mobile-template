
export default {
  install (Vue: Function) {
    Vue.prototype.util = {
      // 判断设备处于PC还是移动端
      isIOS () {
        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
          return true
        } else {
          return false
        }
      }
    }
  }
}
