import styled from 'styled-components'

import { colors } from '../../styles/colors'
import { typography } from '../../styles/typography'

export const Disclaimer = () => {
  return (
    <P>
      By connecting a wallet, you agree to Neptune Mutual
      {' '}
      <StyledLink
        href='/policies/terms-of-use/'
        target='_blank'
      >
        Terms &amp; Conditions
      </StyledLink>
      {' '}
      and acknowledge that you have read and understand the Neptune Mutual
      {' '}
      <StyledLink
        href='/docs/usage/disclaimer/'
        target='_blank'
      >
        Protocol Disclaimer
      </StyledLink>
      .
    </P>
  )
}

const P = styled.p`
  ${typography.styles.textSm};
  color: ${colors.gray[600]};
  margin-top: 4px;

  .dark & {
    color: ${colors.white};
  }
`

const StyledLink = styled.a`
  text-decoration: underline;
  color: inherit;
  
  &:hover {
    color: ${colors.blue[700]};
  }
`
