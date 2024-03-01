const debounce = (func: Function, timeout: number = 300): Function => {
  let timer: NodeJS.Timeout | undefined

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any[]) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const next = (): any => func(...args)

    if (timer != null) {
      clearTimeout(timer)
    }

    timer = setTimeout(next, timeout)
  }
}

export { debounce }
