const addGoogleAnalytics = () => {
  const gtagSource = `https://www.googletagmanager.com/gtag/js?id=${window.googleAnalyticsId}`
  const globalScript = document.createElement('script')
  globalScript.async = true
  globalScript.setAttribute('src', gtagSource)
  document.head.appendChild(globalScript)

  window.dataLayer = window.dataLayer || []

  window.gtag = (...args) => {
    window.dataLayer.push(...args)
  }

  window.gtag('js', new Date())
  window.gtag('config', window.googleAnalyticsId)
}

export { addGoogleAnalytics }
