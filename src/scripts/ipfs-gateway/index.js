// Global Start
import '../components/nav/mega-menu'
import '../components/nav/hamburger'
import '../global/cookie'
import '../global/video'
import '../global/index'
// Global End

{
  const input = document.querySelector('input.ipfs.hash')
  const iframe = document.querySelector('iframe.display.result')

  const IPFS_ORIGIN = 'https://ipfs.neptunemutual.net/ipfs/'

  if (input != null && iframe != null) {
    input.addEventListener('input', (e) => {
      const hash = e.target.value
      if (!hash) {
        iframe.removeAttribute('src')
        return
      }

      iframe.setAttribute('src', IPFS_ORIGIN + hash)
    })
  }
}
