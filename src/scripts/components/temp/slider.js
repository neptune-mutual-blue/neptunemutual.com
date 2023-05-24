{
  const ITEM_SELECTOR = '.with.slider'

  const enableAllButtons = (elements) => {
    elements.buttons.previous && elements.buttons.previous.removeAttribute('disabled')
    elements.buttons.next && elements.buttons.next.removeAttribute('disabled')
  }

  const disableButtonsIfOverflown = ({ positions, elements, gap }) => {
    if (positions.getFirstItemX() >= positions.getSliderX()) {
      elements.buttons.previous && elements.buttons.previous.setAttribute('disabled', 'disabled')
    }

    if (positions.getLastItemLeft() + gap < positions.getSliderRight()) {
      elements.buttons.next && elements.buttons.next.setAttribute('disabled', 'disabled')
    }
  }

  const resetReentrancy = ({ state, positions, elements, gap }) => {
    setTimeout(() => {
      state.reentrant = false

      disableButtonsIfOverflown({ positions, elements, gap })
    }, 500)
  }

  const scroll = ({ offset, state, elements, positions, gap }) => {
    if (state.reentrant) {
      return
    }

    state.reentrant = true

    if (offset > 0 && positions.getFirstItemX() >= positions.getSliderX()) {
      resetReentrancy({ state, positions, elements, gap })
      return
    }

    if (offset < 0 && positions.getLastItemLeft() + gap < positions.getSliderRight()) {
      resetReentrancy({ state, positions, elements, gap })
      return
    }

    enableAllButtons(elements)

    state.translate += offset

    elements.scrollContainer.style.transform = 'translateX(' + state.translate + 'px' + ')'

    resetReentrancy({ state, positions, elements, gap })
  }

  const slider = {
    initialize: (options) => {
      const { selectors, swipeOnly } = options

      const state = {
        translate: 0,
        reentrant: false,
        touchstartX: 0,
        touchendX: 0
      }
      const MIN_THRESHOLD = 60

      const elements = {
        sliderContainer: document.querySelector(selectors.sliderContainer),
        scrollContainer: document.querySelector(selectors.scrollContainer),
        buttonContainer: document.querySelector(selectors.buttonContainer),
        firstItem: document.querySelector(selectors.sliderContainer).querySelector(ITEM_SELECTOR),
        lastItem: document.querySelector(selectors.sliderContainer).querySelector(`${ITEM_SELECTOR}:last-child`),
        buttons: {
          previous: document.querySelector(`${selectors.buttonContainer} button`),
          next: document.querySelector(`${selectors.buttonContainer} button:last-child`)
        }
      }

      const gap = parseInt(elements.sliderContainer.dataset.gap)

      const positions = {
        getFirstItemX: () => elements.firstItem.getBoundingClientRect().x,
        getSliderX: () => elements.sliderContainer.getBoundingClientRect().x,
        getSliderRight: () => elements.sliderContainer.getBoundingClientRect().right,
        getLastItemLeft: () => elements.lastItem.getBoundingClientRect().left,
        offset: elements.firstItem.getBoundingClientRect().width + gap
      }

      {
        const scrollSlider = (offset) => {
          scroll({ offset, state, elements, positions, gap })
        }

        if (!elements.buttonContainer) {
          if (!swipeOnly) {
            return
          }
        }

        elements.sliderContainer.style.setProperty('overflow', 'hidden')
        elements.sliderContainer.classList.remove('extra', 'padding')
        elements.buttonContainer && elements.buttonContainer.classList.remove('hidden')

        elements.buttons.previous && (elements.buttons.previous.onclick = () => scrollSlider(positions.offset))
        elements.buttons.next && (elements.buttons.next.onclick = () => scrollSlider(positions.offset * -1))

        elements.sliderContainer.addEventListener('touchstart', (e) => {
          state.touchstartX = e.changedTouches[0].screenX
        }, { passive: true })

        elements.sliderContainer.addEventListener('touchend', (e) => {
          state.touchendX = e.changedTouches[0].screenX

          if ((state.touchendX + MIN_THRESHOLD) < state.touchstartX) {
            scrollSlider(positions.offset * -1)
          }

          if (state.touchendX > (state.touchstartX + MIN_THRESHOLD)) {
            scrollSlider(positions.offset)
          }
        }, { passive: true })

        disableButtonsIfOverflown({ positions, elements, gap })
      }
    }
  }

  const options = {
    selectors: {
      buttonContainer: '.arrows',
      sliderContainer: '.slider.container',
      scrollContainer: '.slider.scrollable',
      item: '.with.slider'
    },
    swipeOnly: true
  }

  slider.initialize(options)
}
