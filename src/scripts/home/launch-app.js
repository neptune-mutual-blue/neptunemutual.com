{
  // Trigger button
  const toggleButton = document.getElementById('toggle-launch-app')

  // Modal Container
  const launchAppModal = document.getElementById('launch-app-modal')

  // Application Type Text Container
  const launchAppTypeTextContainer = document.getElementById('btn-app-type-text')

  // Application Options
  const options = document.getElementsByName('application-type')

  // Link that will open the app
  const launcher = document.getElementById('launch-app')

  // Modal Content
  const modalContent = document.getElementById('modal-content')

  // Close button
  const closeModal = document.getElementById('launch-modal-close')

  const closeModalHandle = () => {
    launchAppModal.setAttribute('data-open', 'false')
  }

  closeModal.addEventListener('click', closeModalHandle)
  launchAppModal.addEventListener('click', closeModalHandle)

  // Prevent modal to close
  modalContent.addEventListener('click', (e) => {
    e.stopPropagation()
  })

  toggleButton.addEventListener('click', (e) => {
    e.preventDefault()
    launchAppModal.setAttribute('data-open', 'true')
  })

  options.forEach((option) => {
    option.addEventListener('click', (e) => {
      // Update the Button text defends what application is selected
      e.stopPropagation()
      launchAppTypeTextContainer.innerHTML = e.target.value

      // Update the link to the correct link
      launcher.href = e.target.getAttribute('data-href')
    })
  })

  const keydown = (e) => {
    const key = e.which || e.keyCode || e.charCode

    if (key === 27) {
      closeModalHandle()
    }
  }

  document.addEventListener('keydown', keydown)
}
