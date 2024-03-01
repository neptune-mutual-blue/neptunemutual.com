// Container
const container = document.querySelector('.ui.roadmap.container')
const timelineContainer = container.querySelector('.ui.checked.timeline.list')
const storiesContainer = container.querySelector('.ui.story.timeline.list')
// Timeline items
const allTimelineItems = timelineContainer.querySelectorAll('.item[data-slide-index]')
// prev button
const prevBtn = container.querySelector('button#PreviousRoadmapButton')
// next button
const nextBtn = container.querySelector('button#NextRoadmapButton')

const scrollToCenter = (el, timeline = false) => {
  const width = window.innerWidth
  const itemIndex = Number(el.dataset.slideIndex || 0)

  let translateX = itemIndex ? (itemIndex * el.offsetWidth) : 0

  if (timeline) {
    const totalStories = storiesContainer.querySelectorAll('.inner.scroller > .item').length
    const index = (width > 600 && itemIndex >= totalStories - 4) ? totalStories - 4 : itemIndex
    translateX = index ? (index * el.offsetWidth) - 20 : 0
  }

  el.parentNode.style.transform = `translateX(-${translateX}px)`
}

const selectStorySlide = (idx) => {
  const matchedStoryItem = storiesContainer.querySelector(`.item[data-slide-index="${idx}"]`)

  if (!matchedStoryItem) {
    throw Error('Invalid selection')
  }

  // Set data-selected to false for all others
  storiesContainer
    .querySelectorAll('.item[data-selected="true"]')
    .forEach((el) => {
      el.setAttribute('data-selected', 'false')
    })

  // Set data-selected to true for the selected item
  matchedStoryItem.setAttribute('data-selected', 'true')

  // Scroll to selected item
  scrollToCenter(matchedStoryItem)
}

const selectTimelineSlide = (idx) => {
  const matchedTimelineItem = timelineContainer.querySelector(`.item[data-slide-index="${idx}"]`)

  if (!matchedTimelineItem) {
    throw Error('Invalid selection')
  }

  // Set data-selected to false for all others
  timelineContainer
    .querySelectorAll('.item[data-selected="true"]')
    .forEach((el) => {
      el.setAttribute('data-selected', 'false')
    })

  // Set data-selected to true for the selected item
  matchedTimelineItem.setAttribute('data-selected', 'true')

  // Scroll to selected item
  scrollToCenter(matchedTimelineItem, true)
}

const updateArrowsState = (selectedIdx) => {
  const itemCount = allTimelineItems.length

  const idx = parseInt(selectedIdx)

  prevBtn.disabled = idx === 0
  nextBtn.disabled = idx === itemCount - 1
}

// Selecting a slide
const selectSlide = (idx) => {
  selectStorySlide(idx)

  selectTimelineSlide(idx)

  updateArrowsState(idx)
}

// After load, add js-enabled class to container
container.classList.add('js-enabled')

// After load, scroll to correct timeline slide and story slide
const currentTimelineSlide = timelineContainer.querySelector('.item.current')

selectSlide(currentTimelineSlide.getAttribute('data-slide-index'))

// Add event listeners to all items
allTimelineItems.forEach((el) => {
  el.addEventListener('click', function (ev) {
    if (!ev.target) {
      return
    }

    const clickedIndex = this.getAttribute('data-slide-index')

    selectSlide(clickedIndex)
  })
})

// Add event listeners to buttons
prevBtn.addEventListener('click', () => {
  const selectedEl = timelineContainer.querySelector('.item[data-selected="true"]')

  const clickedIndex = selectedEl.getAttribute('data-slide-index')
  selectSlide(parseInt(clickedIndex) - 1)
})

nextBtn.addEventListener('click', () => {
  const selectedEl = timelineContainer.querySelector('.item[data-selected="true"]')

  const clickedIndex = selectedEl.getAttribute('data-slide-index')
  selectSlide(parseInt(clickedIndex) + 1)
})

window.addEventListener('resize', () => {
  const selectedEl = timelineContainer.querySelector('.item[data-selected="true"]')
  const clickedIndex = selectedEl.getAttribute('data-slide-index')
  selectSlide(parseInt(clickedIndex))
})

// handling drag/swipe event for mobile devices
const state = {
  touchstartX: 0,
  touchendX: 0
}
const MIN_THRESHOLD = 60

storiesContainer.addEventListener('touchstart', (e) => {
  state.touchstartX = e.changedTouches[0].screenX
}, { passive: true })

storiesContainer.addEventListener('touchend', (e) => {
  state.touchendX = e.changedTouches[0].screenX

  const selectedEl = timelineContainer.querySelector('.item[data-selected="true"]')
  const currentIndex = parseInt(selectedEl.getAttribute('data-slide-index'))
  const itemCount = allTimelineItems.length
  const isLastIndex = currentIndex === (itemCount - 1)
  const isFirstIndex = currentIndex === 0

  if (((state.touchendX + MIN_THRESHOLD) < state.touchstartX) && !isLastIndex) {
    selectSlide(currentIndex + 1)
  }

  if ((state.touchendX > (state.touchstartX + MIN_THRESHOLD)) && !isFirstIndex) {
    selectSlide(currentIndex - 1)
  }

  state.touchstartX = 0
  state.touchendX = 0
}, { passive: true })
