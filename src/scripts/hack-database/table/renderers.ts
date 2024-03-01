import {
  abbreviateHackDatabaseAmount
} from '../../../../util/abbreviate-hack-database-amount'
import { formatDate } from '../../../../util/format'
import { stripTags } from '../../../../util/strip-tags'
import { chainIconMapping } from '../../../data/chain-icon-mapping'

const availableChainIcons = Object.keys(chainIconMapping)

const renderers: Record<string, (hack: Hack) => string> = {
  Name: (hack: Hack) => hack.name,
  Date: (hack: Hack) => formatDate(new Date(hack.date), 'en-GB', { dateStyle: 'short', timeZone: 'GMT' }),
  'Amount Lost': (hack: Hack) => {
    const amount = abbreviateHackDatabaseAmount(hack.amountLost)

    return `<span data-tooltip='${amount.long}'>${amount.short}</span>`
  },
  Chains: (hack: Hack) => `
  <div class="chain icon group">
    ${(hack.chains ?? []).length === 0 ? '-' : ''}
    ${(hack.chains ?? []).map(chain =>
    availableChainIcons.includes(chain.shortName.toLowerCase())
      ? (
        `<i class="${chain.shortName.toLowerCase() + ' chain icon'}" title="${chain.title}"></i>`
      )
      : (
        `<div class="random chain icon" title="${chain.title}">${chain.shortName[0]}</div>`
      )
  ).join('\n')
    }
  </div>
  `,
  Technique: (hack: Hack) => hack.techniques,
  Description: (hack: Hack) => hack.description ?? '',
  Link: (hack: Hack) => hack.link
}

const columns = Object.keys(renderers)

const isDescription = (col: string): boolean => col === 'Description'
const isLink = (col: string): boolean => col === 'Link'

const getTableCell = (column: string, index: number, hack: Hack): string => {
  if (isDescription(column)) {
    const description = renderers[column](hack)

    return `
    <td data-index="${index}">
      <i class="icon chevron down${description.length > 0 ? '' : ' disabled'}" />
    </td>`
  }

  if (isLink(column)) {
    const link = renderers[column](hack)
    return `
    <td>
      <a ${link.length > 0 ? `href="${link}"` : 'class="disabled"'} target = "_blank" >
        <i class="icon external link"></i>
      </a>
    </td>`
  }

  return `
  <td>
    <span>${renderers[column](hack)}</span>
  </td>`
}

const getTableRow = (hack: Hack, index: number): string => `
  <tr>
    ${columns
    .map(column => getTableCell(column, index, hack))
    .join('\n')}
  </tr>

  <tr class="description initially hidden" data-index="${index}">
    <td colspan="${columns.length}">
      <div class="description wrapper">
        <div
          class="description content">
          ${stripTags(hack.description ?? '')}
        </div>
      </div>
    </td>
  </tr>
`

const getTableRows = (hacks: Hack[]): string =>
  hacks
    .map(
      getTableRow
    )
    .join('\n')

export { getTableRows }
