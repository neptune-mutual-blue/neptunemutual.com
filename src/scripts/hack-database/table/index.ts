import { filterHackData } from './filter'
import { setupSearch } from './search'
import { setupSorting } from './sort'
import { setupTogglers } from './togglers'

// self executing function to setup js handlers for hack database
(() => {
  setupTogglers()
  filterHackData(1, true).catch(console.error)
  setupSearch()
  setupSorting()
})()
