import { Icon } from '../react-code/components/Icon'

const NftCard = ({ name, views, count, nftId, image }) => {
  return (
    <a className={'nft card container'} href={'/'}>
      <div className="image container">
        <img src={image} alt={name || 'NFT Image'} loading="lazy" />
      </div>

      <div className="contents">
        <div className="title container">
          <h3>{name}</h3>
        </div>

        <div className="info container">
          <div className="nft id">
            #{nftId}
          </div>
          <div className="insights">
            <div className="nft insight">
              <span className="sr-only">Views</span>
              <Icon variant="eye" size={'sm'} />
              <span>{views}</span>
            </div>
            <div className="nft insight">
              <span className="sr-only">Count</span>
              <Icon variant="users-01" size={'sm'} />
              <span>{count}</span>
            </div>
          </div>
        </div>
      </div>
    </a>
  )
}

export { NftCard }
