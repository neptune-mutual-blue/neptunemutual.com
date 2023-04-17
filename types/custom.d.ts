type ApiResource = [string, string, boolean?]

interface FileDownloadArgs {
  remote: string
  local: string
}

interface FooterData {
  lists: NavLinkList[]
  socials: Array<{
    icon: string
    text: string
    href: string
    isExternal: boolean
  }>
}

interface NavLinkList {
  title: string
  links: Array<{
    href: string
    text: string
    isExternal: boolean
    includeTheme?: boolean
    badge?: string
    badgeColor?: 'success' | 'info'
  }>
}

interface Filter {
  text: string
  value?: string
}

interface BreadcrumbItem {
  name: string
  link: string
}

interface PaginationResult {
  previous?: number
  pages: Array<number | null | undefined> | undefined
  next?: number
}

interface PaginatedResult<T> {
  records?: number
  totalPages?: number
  pageSize?: number
  pages: Record<string, T[]>
}

interface PaginatedByTagsResult<T> {
  tag: any
  records?: number
  totalPages?: number
  pageSize?: number
  pages: Record<string, T[]>
}

interface ApiResult<T> {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: any
  nextPage: any
}

interface TableOfContentEntry {
  text: string
  id: string
  type: number
}

interface ParsedArticle extends Content {
  parsedHtml: string
  pageUrl: string
  timeToRead: number
  featuredImage: string
  alt: string
  tag?: Tag
  toc: TableOfContentEntry[]
}

interface DetailedListViewItem {
  title: string
  intro: string
  badges: Tag[]
  href: string
  icon: string
  category: string
  target?: string
}

interface NamedIcon {
  name: string
  icon: any
}

interface ConversionField {
  name: string
  placeHolder: string
  type: string
  value: string
}

type EthereumUnit = 'kWei' | 'mWei' | 'gWei' | 'szabo' | 'finney' | 'ether' | 'kEther' | 'mEther' | 'gEther' | 'tEther'

interface CatchAllRedirectPageProps {
  redirect: true
  dest: string
  [key: string]: any
}

interface CatchAllStandalonePageProps {
  redirect: false
  [key: string]: any
}

interface CatchAllPageData {
  props: CatchAllRedirectPageProps | CatchAllStandalonePageProps
  slug: string
}

interface CatchAllStaticPath {
  params: {
    slug: string
  }
  props: CatchAllRedirectPageProps | CatchAllStandalonePageProps
}

interface TeamMember {
  id: string
  image: string
  name: string
  title: string
  links: {
    linkedIn?: string
    twitter?: string
    facebook?: string
    medium?: string
  }
}

interface FeatureItem {
  icon: string
  title: string
  text: string
  includeTheme?: boolean
  href?: string
  badge?: string
  isExternal?: boolean
}

interface HomepageFeatureItem extends FeatureItem {
  id: number
  image: SVGElement
}

interface SitemapEnumerable {
  type: string
  prefix: string
  enumerable: WithSlug[]
}

interface SitemapItem {
  loc: string
  changefreq?: 'daily' | 'weekly' | 'monthly'
}

interface SitemapUrl {
  url: SitemapItem
}

interface Sitemap {
  urlset: SitemapUrl[]
}

type WrappedPromise = (() => Promise<void>)
type TaskWithDefinition = [string, ...WrappedPromise[]]

interface TabItem {
  text: string
  href: string
  active?: boolean
  icon?: any
  id?: string
}

type ProtocolContractType = 'contracts' | 'cxTokens' | 'pods'

interface NetworkConfig {
  id: number
  title: string
  app: string
  explorer: string
}

interface NavSection {
  type: 'section' | 'videos-section'
  title: string
  links?: FeatureItem[]
  more?: {
    title: string
    href: string
  }
}

interface LinkNav {
  title: string
  href?: string
  children?: NavSection[]
}

interface Web3ToolItem {
  slug?: string
  path?: string
  title: string
  intro: string
  category: string
  icon: string
  badges: Array<{
    color: string
    icon: string
    text: string
  }>
  target?: '_blank' | '_self' | '_parent' | '_top'
}

interface TableRenderConfig<T> {
  label: string
  render: (item: T) => string
  sortable?: boolean
  searchable?: boolean
  isDescription?: boolean
  isLink?: boolean
}
