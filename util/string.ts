function createContractKey (name: string, address: string, network: string | number): string {
  const joined = [name, address, network]
    .filter(Boolean)
    .map(item => item.toString().trim().toLowerCase().split(' ').join('_'))
    .join('_')

  return joined
}

export { createContractKey }
