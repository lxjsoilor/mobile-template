// 过滤日期格式，传入时间戳，根据参数返回不同格式
const formatTimer = function (val: number, hours: boolean) {
  if (val) {
    const dateTimer: Date = new Date(val * 1000)
    const y: any = dateTimer.getFullYear()
    let M: any = dateTimer.getMonth() + 1
    let d: any = dateTimer.getDate()
    let h: any = dateTimer.getHours()
    let m: any = dateTimer.getMinutes()
    M = M >= 10 ? M : '0' + M
    d = d >= 10 ? d : '0' + d
    h = h >= 10 ? h : '0' + h
    m = m >= 10 ? m : '0' + m
    if (hours) {
      return y + '-' + M + '-' + d + ' ' + h + ':' + m
    } else {
      return y + '-' + M + '-' + d
    }
  }
}
export {
  formatTimer
}
