import { InjectedConnector } from './package'

export const getConnector = () => {
  return new InjectedConnector()
}
