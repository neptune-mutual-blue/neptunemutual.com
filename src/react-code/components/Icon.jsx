import {
  useEffect,
  useState
} from 'react'

import { paths } from '../../elements/icons/paths'

export const Icon = ({ variant, size }) => {
  const [innerHTML, setInnerHTML] = useState(variant)

  useEffect(() => {
    const update = async () => {
      if (!paths[variant]) return

      const _innerHTML = await paths[variant].then((x) => x.default)
      setInnerHTML(_innerHTML)
    }

    update()
  }, [variant])

  return innerHTML
    ? <i data-size={size} dangerouslySetInnerHTML={{ __html: innerHTML }} />
    : <></>
}
