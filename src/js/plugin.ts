function initRem () {
  const cale: number = window.screen.availWidth > 750 ? 2 : window.screen.availWidth / 375
  window.document.documentElement.style.fontSize = `${100 * cale}px`
}
initRem()
window.addEventListener('resize', function () {
  initRem()
  if (
    (document as any).activeElement.tagName === 'INPUT' ||
    (document as any).activeElement.tagName === 'TEXTAREA'
  ) {
    window.setTimeout(function () {
      if ('scrollIntoView' in (document as any).activeElement) {
        (document as any).activeElement.scrollIntoView(false)
      } else {
        (document as any).activeElement.scrollIntoViewIfNeeded(false)
      }
    }, 0)
  }
})
