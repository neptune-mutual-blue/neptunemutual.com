// Global Start
import '../components/nav/mega-menu'
import '../components/nav/hamburger'
import '../global/cookie'
import '../global/video'
import '../global/index'
import './sidebar'
import '../global/search'

import hljs from 'highlight.js'

import mediumZoom from '../utils/image-zoom.min'

const highlightLineNumbersLoad = async () => {
  return await import('highlightjs-line-numbers.js')
}

{
  const images = [
    ...document.querySelectorAll('.story .content img')
  ]

  mediumZoom(images)
}

;(async function () {
  hljs.highlightAll()
  window.hljs = hljs
  await highlightLineNumbersLoad()
  hljs.initLineNumbersOnLoad()
})()
