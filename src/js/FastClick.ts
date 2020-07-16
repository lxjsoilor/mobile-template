import FastClick from 'fastclick'
interface FastClickObject {
  setSelectionRange: Function;
  type: string;
  focus: Function;
  value: [];
}
const deviceIsIOS: RegExpMatchArray | null = (navigator.userAgent).match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
FastClick.prototype.focus = function (targetElement: FastClickObject) {
  let length: number
  if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
    length = targetElement.value.length
    targetElement.setSelectionRange(length, length)
    targetElement.focus()
  } else {
    targetElement.focus()
  }
}
// FastClick.attach(document.body)
