import * as api from '../../service/api'
import { Api } from '../../types/enum'

const socials: FooterData['socials'] = [
  {
    icon: 'twitter',
    text: 'twitter',
    href: 'https://twitter.com/neptunemutual',
    isExternal: true
  },
  {
    icon: 'reddit',
    text: 'reddit',
    href: 'https://www.reddit.com/r/NeptuneMutual/',
    isExternal: true
  },
  {
    icon: 'telegram',
    text: 'telegram',
    href: 'https://t.me/neptunemutual',
    isExternal: true
  },
  {
    icon: 'github',
    text: 'github',
    href: 'https://github.com/neptune-mutual-blue',
    isExternal: true
  },
  {
    icon: 'linkedin',
    text: 'linkedin',
    href: 'https://www.linkedin.com/company/neptune-mutual',
    isExternal: true
  },
  {
    icon: 'youtube',
    text: 'youtube',
    href: 'https://www.youtube.com/c/NeptuneMutual',
    isExternal: true
  },
  {
    icon: 'discord',
    text: 'discord',
    href: 'https://discord.com/invite/2qMGTtJtnW',
    isExternal: true
  }
]

const getFooterData = async (): Promise<FooterData> => {
  const policies = await api.getEnumerable<Page>(Api.Policy, 10, 0)

  const lists: NavLinkList[] = [
    {
      title: 'Resources',
      links: [
        {
          href: '/marketplace',
          text: 'Marketplace',
          isExternal: false,
          badge: 'New!',
          badgeColor: 'success'
        },
        { href: '/blog/', text: 'Blog', isExternal: false },
        { href: '/pressroom/', text: 'Press Room', isExternal: false },
        { href: '/ecosystem/', text: 'Ecosystem', isExternal: false },
        { href: '/docs/', text: 'Documentation', isExternal: false },
        { href: '/web3-tools/', text: 'Web3 Tools', isExternal: false },
        { href: 'https://nft.neptunemutual.com/', includeTheme: true, text: 'NFT Portal', isExternal: false },
        { href: 'https://explorer.neptunemutual.net/', includeTheme: true, text: 'Explorer', isExternal: false }
      ]
    },
    {
      title: 'Company',
      links: [
        { href: '/about/', text: 'About us', isExternal: false },
        {
          href: '/grants-and-bounties/',
          text: 'Grants and Bounties',
          isExternal: false
        },
        {
          href: '/careers/',
          text: 'Careers',
          isExternal: false,
          badge: "We're Hiring!"
        },
        { href: '/security/', text: 'Security', isExternal: false },
        { href: '/contact/', text: 'Contact', isExternal: false }
      ]
    },
    {
      title: 'Policies',
      links: policies.sort((a, b) => a.sort - b.sort).map((page) => {
        return {
          href: `/policies/${page.slug}/`,
          text: page.title,
          isExternal: false
        }
      })
    }
  ]

  return {
    lists,
    socials
  }
}

export { getFooterData }
