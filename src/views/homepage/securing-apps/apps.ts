interface App {
  id: string
  name: string
  src: Promise<string>
}

export const apps: App[] = [
  { id: 'aave', name: 'Aave', src: import('./logo/aave.svg?raw').then(x => x.default) },
  { id: 'balancer', name: 'Balancer', src: import('./logo/balancer.svg?raw').then(x => x.default) },
  { id: 'gnosissafe', name: 'Gnosis Safe', src: import('./logo/gnosis-safe.svg?raw').then(x => x.default) },
  { id: 'makerdao', name: 'Maker DAO', src: import('./logo/makerdao.svg?raw').then(x => x.default) },
  { id: 'binance', name: 'Binance', src: import('./logo/binance.svg?raw').then(x => x.default) },
  { id: 'okx', name: 'OKX', src: import('./logo/okx.svg?raw').then(x => x.default) },
  { id: 'uniswap', name: 'Uniswap', src: import('./logo/uniswap.svg?raw').then(x => x.default) },
  { id: 'curve', name: 'Curve', src: import('./logo/curve.svg?raw').then(x => x.default) },
  { id: '1inch', name: '1inch', src: import('./logo/1inch.svg?raw').then(x => x.default) },
  { id: 'bancor', name: 'Bancor', src: import('./logo/bancor.svg?raw').then(x => x.default) },
  { id: 'compound', name: 'Compound', src: import('./logo/compound.svg?raw').then(x => x.default) },
  { id: 'convex', name: 'Convex', src: import('./logo/convex.svg?raw').then(x => x.default) },
  { id: 'dydx', name: 'dydx', src: import('./logo/dydx.svg?raw').then(x => x.default) },
  { id: 'gmx', name: 'GMX', src: import('./logo/gmx.svg?raw').then(x => x.default) },
  { id: 'sushiswap', name: 'Sushiswap', src: import('./logo/sushiswap.svg?raw').then(x => x.default) }
]
