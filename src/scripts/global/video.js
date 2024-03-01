const modalSelector = '.video.modal.container'
// const closeButtonSelector = 'button.video.modal.close'
const iframeSelector = 'iframe.video.modal.iframe'
const playButtonSelector = '.video.play.button'

const videoContainer = document.querySelector(modalSelector)
const iframe = document.querySelector(iframeSelector)

// buttons that will trigger modal open
const videoPlayButtons = document.querySelectorAll(playButtonSelector)

// function to execute when modal is closed
const onModalClose = () => {
  // trick to stop the video from keep playing even after the container is hidden
  iframe.removeAttribute('src')

  // remove listener when modal closed
  // eslint-disable-next-line no-use-before-define,@typescript-eslint/no-use-before-define
  document.removeEventListener('keydown', onEscapeKey)
  videoContainer.setAttribute('data-open', 'false')
}

// when escape button is pressed
const onEscapeKey = (e) => {
  if (e.key === 'Escape') {
    onModalClose()
  }
}

// function to execute when video modal is opened
const onModalOpen = (e) => {
  // get video src using `data-video-id` attribute in play button
  const videoId = e.currentTarget.getAttribute('data-video-id')
  const videoSrc = `https://www.youtube.com/embed/${videoId}`

  iframe.setAttribute('src', videoSrc)

  videoContainer.setAttribute('data-open', 'true')

  // add listener when modal opened
  document.addEventListener('keydown', onEscapeKey)
}

videoPlayButtons.forEach((videoPlayButton) => {
  videoPlayButton.addEventListener('click', onModalOpen)
})

// close modal when modal is pressed
videoContainer.addEventListener('click', () => {
  onModalClose()
})
