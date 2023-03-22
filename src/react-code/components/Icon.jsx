import {
  useEffect,
  useState
} from 'react'

import styled from 'styled-components'

import { paths } from '../../elements/icons/paths'

const Icon = ({ variant, size }) => {
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
    ? <IconWrapper size={size} dangerouslySetInnerHTML={{ __html: innerHTML }} />
    : <></>
}

const IconWrapper = styled.i`
  svg {
    width: ${props => props.size}px;
    height: ${props => props.size}px;
  }
`

export { Icon }
