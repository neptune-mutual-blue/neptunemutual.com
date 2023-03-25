import { Api } from '../../../../../types/enum'

type Entries = Array<[Api, string?]>

const entries: Entries = [
  [Api.Blog],
  [Api.Pressroom],
  [Api.Audit, 'security'],
  [Api.Policy, 'policies'],
  [Api.Program, 'grants-and-bounties'],
  [Api.Vacancy, 'careers'],
  [Api.Doc]
]

export { entries }
