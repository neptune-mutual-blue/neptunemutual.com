interface Meta {
  title: string
  description: string
  image?: Media
}

declare enum DocumentStatus {
  Draft = 'draft',
  Published = 'published'
}

declare enum VideoType {
  Youtube = 'youtube',
  Vimeo = 'vimeo'
}

declare enum EcosystemType {
  CoverCreators = 'cover-creators',
  LiquidityProviders = 'liquidity-providers',
  Policyholders = 'policyholders'
}

interface WithSlug {
  slug: string
}

// ---------------------------------------------------------------------------------------------

interface Media {
  id: string
  alt: string
  filename: string
  mimeType: string
  filesize: number
  url: string
  width: number
  height: number
  createdAt: Date
  updatedAt: Date
}

interface Tag {
  id: string
  name?: string
  text?: string
  outline?: boolean
  slug: string
  color: string
  meta?: Meta
  createdAt?: Date
  updatedAt?: Date
}

interface TagWithHref extends Tag {
  href?: string
  icon?: string
  size?: '2xl' | 'xl' | 'lg' | 'md' | 'sm'
}

interface Content {
  id: string
  title: string
  intro: string
  slug?: string
  href?: string
  cover?: Media
  tags?: Tag[]
  createdAt?: Date
  updatedAt?: Date
  publishedAt?: Date
}

interface Roadmap extends Content {
  id: string
  title: string
  slug: string
  current: boolean
  sort: number
  html: string
  _status: DocumentStatus
  createdAt?: Date
  updatedAt?: Date
  publishedAt?: Date
}

interface Article extends Content {
  id: string
  title: string
  slug?: string
  intro: string
  cover: Media
  html: string
  featured?: true
  tags?: Tag[]
  meta: Meta
  _status: DocumentStatus
  createdAt?: Date
  updatedAt?: Date
  publishedAt?: Date
}

interface NewsItem extends Content {
  id: string
  press: MediaHouse
  title: string
  cover: Media
  link: string
  _status: DocumentStatus
  createdAt?: Date
  updatedAt?: Date
  publishedAt?: Date
}

interface Page extends Content {
  id: string
  category: string
  sort: number
  title: string
  slug: string
  html: string
  _status: DocumentStatus
  createdAt?: Date
  updatedAt?: Date
  publishedAt?: Date
  meta: Meta
}

interface Program {
  id: string
  category: string
  intro: string
  title: string
  slug: string
  icon: string
  badges: string
  html: string
  _status: DocumentStatus
  createdAt?: Date
  updatedAt?: Date
  publishedAt?: Date
  meta: Meta
}

interface Video {
  id: string
  type: VideoType
  title: string
  slug: string
  category: string
  videoId: string
  sort: number
  length: number
  thumbnail: Media
  html: string
  _status: DocumentStatus
  createdAt?: Date
  updatedAt?: Date
  publishedAt?: Date
}

interface Partner {
  id: string
  name: string
  slug: string
  icon: Media
  logo: Media
  _status: DocumentStatus
  createdAt?: Date
  updatedAt?: Date
  publishedAt?: Date
}

interface Audit {
  id: string
  title: string
  slug: string
  partner: Partner
  intro: string
  badges: string
  startDate: string
  endDate: string
  report: Media
  html: string
  meta: Meta
  _status: DocumentStatus
  createdAt?: Date
  updatedAt?: Date
  publishedAt?: Date
}

interface MediaHouse {
  id: string
  name: string
  badge: string
  _status: DocumentStatus
  createdAt?: Date
  updatedAt?: Date
  publishedAt?: Date
}

interface Ecosystem {
  id: string
  type: EcosystemType
  content: string
  _status: DocumentStatus
  createdAt?: Date
  updatedAt?: Date
  publishedAt?: Date
}

interface Vacancy extends Content {
  id: string
  title: string
  slug: string
  intro: string
  type: string
  location: string
  department: string
  badges: string
  form: string
  html: string
  meta: Meta
  _status: DocumentStatus
  expired?: boolean
  createdAt?: Date
  updatedAt?: Date
  publishedAt?: Date
}

interface ApiResponse<T> {
  message: string
  code: string
  data: T
}

interface CxToken {
  coverKey: string
  productKey: string
  value: string
  expiry: string
}

interface KeyValuePair<T> {
  key: string
  value: T
}

interface ProtocolContracts {
  chainId: number
  network: string
  contracts: Array<KeyValuePair<string>>
  coverKeys: string[]
  pods: Array<KeyValuePair<string>>
  tokens: Array<KeyValuePair<string>>
  pairs: Array<KeyValuePair<string>>
  cxTokens: CxToken[]
}

interface Chain {
  slug: string
  chainid?: number
  title: string
  shortName: string
  nativeCurrency: string
  html: string
}

interface Hack {
  name: string
  date: Date
  amountLost: string
  chains?: Chain[]
  techniques: string
  description?: string
  link: string
}

interface Documentation extends Content {
  id: string
  navigationLabel: string
  title: string
  subtitle?: string
  order: number
  parent: Documentation
  slug: string
  unlinked: boolean
  html: string
  _status: string
  createdAt: Date
  updatedAt: Date
  meta: Meta
}
