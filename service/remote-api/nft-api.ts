import { env } from '../../util/env'

const origin: string = env('NFT_API_ORIGIN')

const knowYourCharacters = async (): Promise<ApiResponse<NftCharacter[]>> => {
  const response = await fetch(origin + '/home/know-the-characters')

  const data = await response.json()

  return data
}

const mostViewedNfts = async (): Promise<ApiResponse<NftCharacterWithViews[]>> => {
  const response = await fetch(origin + '/home/most-viewed-nfts')

  const data = await response.json()

  return data
}

const premiumNfts = async (): Promise<ApiResponse<NftCharacter[]>> => {
  const response = await fetch(origin + '/home/premium-nfts')

  const data = await response.json()

  return data
}

const regularNfts = async (): Promise<ApiResponse<NftCharacter[]>> => {
  const response = await fetch(origin + '/home/regular-nfts')

  const data = await response.json()

  return data
}

const getNftDetails = async (tokenId: string): Promise<ApiResponse<NftDetails[]>> => {
  const response = await fetch(origin + '/marketplace/' + tokenId)

  const data = await response.json()

  return data
}

const NftApi = {
  knowYourCharacters,
  mostViewedNfts,
  premiumNfts,
  regularNfts,
  getNftDetails
}

export { NftApi }
