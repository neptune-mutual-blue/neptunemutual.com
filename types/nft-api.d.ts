interface NftCharacter {
  level?: number
  role: string
  name: string
  description: string
  startIndex: number
  image: string
  siblings: number
  rarity: number
  type?: string
}

type NftCharacterWithViews = NftCharacter & { views: string }

type NftDetails = NftCharacterWithViews & {
  tokenId: string
  stage: string
  tokenOwner?: any
  nickname: string
  family: string
  views: string
  wantToMint: string
  url: string
  externalUrl: string
  datePublished: string
  soulbound: boolean
  attributes: NftCharacterAttribute[]
}

interface NftCharacterAttribute {
  value: number | string
  traitType: string
  maxValue?: number
}
