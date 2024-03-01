import {
  handlers,
  onclick
} from './click'

const careersFilterButton = document.querySelector('#CareersFilterButton')
const menu = document.querySelector('.ui.dropdown.filter.container .menu')
const listItems = document.querySelectorAll('.ui.dropdown.filter.container .menu > ul > li')

const keydown = (e) => {
  const key = e.which || e.keyCode || e.charCode

  if (key !== 13) {
    return
  }

  onclick(e.currentTarget)
}

careersFilterButton.addEventListener('click', (e) => {
  e.stopPropagation()
  handlers.toggleDropdown()
})

listItems.forEach((listItem) => {
  listItem.addEventListener('click', e => onclick(e.currentTarget))
  listItem.addEventListener('keydown', keydown)
})

document.addEventListener('click', (e) => {
  const open = menu.getAttribute('data-open')

  if (open === 'false') {
    return
  }

  if (!e.target.closest('.menu')) {
    handlers.close()
  }
})
