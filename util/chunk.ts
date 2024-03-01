const chunk = <T>(array: T[], chunkSize: number): T[][] => {
  const chunks = []

  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize))
  }

  return chunks
}

const chunkType = <T>(array: T[], chunkSize: number): T[] => {
  const chunks: T[] = []

  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize) as T)
  }

  return chunks
}

export { chunk, chunkType }
