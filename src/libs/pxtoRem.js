const setDomFonsSize = () => {
  const width = document.documentElement.clinetWidth || document.body.clientWidth
  const fontSize = (width <= 1200 ? 1200 : width) / 120 + 'px'
  document.getElementsByTagName('html')[0].style['font-size'] = fontSize
}
setDomFonsSize()
window.addEventListener('resize', setDomFonsSize)
