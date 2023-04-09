// Global Start
import '../components/nav/mega-menu'
import '../components/nav/hamburger'
import '../global/cookie'
import '../global/video'
import '../global/index'
// Global End
import '../components/content-viewer/index'
import '../components/subscription/index'
import '../components/blog-pressroom-viewer/index'

import hljs from 'highlight.js'

const highlightLineNumbersLoad = async () => {
  return await import('highlightjs-line-numbers.js')
}

;(async function () {
  hljs.highlightAll()
  window.hljs = hljs
  await highlightLineNumbersLoad()
  hljs.initLineNumbersOnLoad()
})()
