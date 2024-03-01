import {
  BLOG_IDBVALIDKEY,
  DOCS_IDBVALIDKEY,
  TEXT_OFFSET
} from '../global/search/constant'

function debounce (func, timeout = 300) {
  let timer

  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

const pathname = window.location.pathname
const isDocsPage = pathname.startsWith('/docs')
const isBlogPage = pathname.startsWith('/blog')

const getIDBValidKey = () => {
  if (isDocsPage) {
    return DOCS_IDBVALIDKEY
  }

  if (isBlogPage) {
    return BLOG_IDBVALIDKEY
  }
}

const getCacheUrl = () => {
  if (isDocsPage) {
    return '/cache/docs.json'
  }

  if (isBlogPage) {
    return '/cache/blog.json'
  }
}

const getRootPath = () => {
  if (isDocsPage) {
    return '/docs'
  }

  if (isBlogPage) {
    return '/blog'
  }
}

const getUpdatedHtml = (texts = [], searchTerm = '') => {
  const text = texts.find(text => text && text.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)

  if (!text) {
    const fallbackText = texts.find(_text => Boolean(_text)) ?? ''
    return fallbackText
      .substring(0, 2 * TEXT_OFFSET)
  }

  const pos = text.toLowerCase().indexOf(searchTerm.toLowerCase())
  const start = pos - TEXT_OFFSET
  const end = pos + TEXT_OFFSET

  const pattern = new RegExp(`(${searchTerm})`, 'i')
  let html = text
    .substring(start, end)
    .replace(pattern, '<span class=\'match\'>$1</span>') + ' ...'

  html = (start > 0 ? '... ' : '') + html

  return html
}

export { debounce, getCacheUrl, getIDBValidKey, getRootPath, getUpdatedHtml }
