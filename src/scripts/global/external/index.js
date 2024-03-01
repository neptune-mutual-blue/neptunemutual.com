import { addClarityAnalytics } from './clarity'
import { addGoogleAnalytics } from './google-analytics'

const addAnalytics = () => {
  addClarityAnalytics()
  addGoogleAnalytics()
}

export { addAnalytics }
