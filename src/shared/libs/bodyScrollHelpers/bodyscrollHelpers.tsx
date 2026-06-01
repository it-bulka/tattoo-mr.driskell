const supportsScrollbarGutter =
  typeof CSS !== 'undefined' && CSS.supports('scrollbar-gutter', 'stable')

export const disableBodyScroll = () => {
  document.body.style.overflow = 'hidden'
  if (!supportsScrollbarGutter) {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.paddingRight = `${scrollBarWidth}px`
  }
}

export const enableBodyScroll = () => {
  document.body.style.overflow = ''
  if (!supportsScrollbarGutter) {
    document.body.style.paddingRight = ''
  }
}
