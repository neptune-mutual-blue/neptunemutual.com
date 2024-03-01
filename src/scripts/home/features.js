{
  const containerClassSelector = '.features.section'

  // Get all tabs
  const tabs = document.querySelectorAll(
    `${containerClassSelector} .tab.list:not(.panel) .item`
  )

  // Get all tab panels
  const tabPanels = document.querySelectorAll(
    `${containerClassSelector} .tab.panel.list .item`
  )

  // Add click event listener to tabs
  tabs.forEach((tab) => {
    tab.addEventListener('click', function (ev) {
      if (!ev.target) {
        return
      }

      const selectedId = this.getAttribute('data-tab-id')

      // Update data-active for tabs
      tabs.forEach((el) => {
        const isSelected = el.getAttribute('data-tab-id') === selectedId

        if (isSelected) {
          el.setAttribute('data-active', 'true')
          return
        }

        el.setAttribute('data-active', 'false')
      })

      // Update data-active for tab panels
      tabPanels.forEach((el) => {
        const isSelected = el.getAttribute('data-tabpanel-id') === selectedId

        if (isSelected) {
          el.setAttribute('data-active', 'true')
          return
        }

        el.setAttribute('data-active', 'false')
      })
    })
  })
}
