enum Api {
  Audit = 'audits',
  Blog = 'blog',
  Contract = 'contracts',
  ContractArbitrum = 'contracts.arbitrum',
  ContractMumbai = 'contracts.mumbai',
  ContractBSC = 'contracts.bsc',
  Ecosystem = 'ecosystems',
  Doc = 'docs',
  Media = 'media',
  News = 'news',
  Policy = 'pages',
  Pressroom = 'pressroom',
  Program = 'programs',
  Roadmap = 'roadmap',
  Vacancy = 'vacancies',
  Video = 'videos',
  Hack = 'hacks'
}

type BlogOrPressroom = Api.Blog | Api.Pressroom

enum Network {
  Ethereum = 1,
  Arbitrum = 42161,
  Mumbai = 80001,
  BaseGoerli = 84531,
  BSC = 56
}

export { Api, BlogOrPressroom, Network }
