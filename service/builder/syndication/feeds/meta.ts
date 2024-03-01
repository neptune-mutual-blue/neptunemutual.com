import { Api } from '../../../../types/enum'

const getMeta = (api: Api): Meta => {
  if (api === Api.Blog) {
    return {
      title: 'Neptune Mutual Blog Feed',
      description: 'Neptune Mutual blog is the go-to location for learning about web3 and smart contract vulnerabilities, decentralized insurance, security best practices, and industry news. Enter your address to get weekly updates.'
    }
  }

  return {
    title: 'Neptune Mutual Pressroom Feed',
    description: 'Together, let’s build a safer Ethereum DeFi ecosystem for everyone by decentralizing and democratizing crypto-native insurance.'
  }
}

export { getMeta }
