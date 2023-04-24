import './Disclaimer.scss'

export const Disclaimer = () => {
  return (
    <p className='disclaimer'>
      By connecting a wallet, you agree to Neptune Mutual
      {' '}
      <a
        href='https://docs.neptunemutual.com/usage/terms-of-use'
        target='_blank'
      >
        Terms &amp; Conditions
      </a>
      {' '}
      and acknowledge that you have read and understand the Neptune Mutual
      {' '}
      <a
        href='https://docs.neptunemutual.com/usage/disclaimer'
        target='_blank'
      >
        Protocol Disclaimer
      </a>
      .
    </p>
  )
}
