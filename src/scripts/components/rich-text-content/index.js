{
  const images = Array.from(document.querySelectorAll('.rich.text.container img'))

  if (images.length > 0) {
    import('../../utils/image-zoom.min')
      .then(({ mediumZoom }) => mediumZoom(images))
      .catch(() => console.log('Cannot add medium zoom effect'))
  }
}
