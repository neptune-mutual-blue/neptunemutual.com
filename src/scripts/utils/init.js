import hljs from 'highlight.js'
import { registerLanguages } from '../../../lib/hljs-languages'

async function init () {
  registerLanguages(hljs)
  hljs.highlightAll()

  window.hljs = hljs
  await import('highlightjs-line-numbers.js')

  return hljs
}

export { init }
