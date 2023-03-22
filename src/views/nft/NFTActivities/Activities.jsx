import { Icon } from '../../../react-code/components/Icon'

// @todo: remove mock images from 'public/assets/images/test' after api implementation
const activities = [
  {
    avatar: '/assets/images/test/avatar1.png',
    name: 'Cashium',
    time: 'just now',
    text: 'Cashium has joined the Neptune Mutual NFT Collection Community!',
    comments: '1024'
  },
  {
    avatar: '/assets/images/test/avatar1.png',
    name: 'Cashium2',
    time: '1 hour ago',
    images: ['/assets/images/test/img.png', '/assets/images/test/img.png'],
    imageDesc: 'PoodleTesla has joined the Beasts',
    comments: '999'
  },
  {
    avatar: '/assets/images/test/avatar1.png',
    name: 'Cashium2',
    time: '1 hour ago',
    images: ['/assets/images/test/img.png'],
    imageDesc: 'PoodleTesla has joined the Beasts',
    comments: '999'
  },
  {
    avatar: '/assets/images/test/avatar1.png',
    name: 'Cashium2',
    time: '1 hour ago',
    text: 'Cashium has joined the Neptune Mutual NFT Collection Community!',
    images: [
      '/assets/images/test/img.png',
      '/assets/images/test/img.png',
      '/assets/images/test/img.png',
      '/assets/images/test/img.png'
    ],
    imageDesc: 'PoodleTesla has joined the Beasts',
    comments: '999'
  }
]

const Activities = () => {
  return (
    <div className="nft activities container">
      <h2>Activities</h2>

      <div className="activities list">
        {
          activities.map(
            ({ avatar, name, time, text, images, imageDesc, comments }, idx) => (
              <div className="activity container" key={idx}>
                <div className="avatar and name">
                  <img src={avatar} />
                  <div className="text">
                    <p className="name">{name}</p>
                    <p className="time">{time}</p>
                  </div>
                </div>

                <hr />

                <div className="content">
                  {text && <p className="text">{text}</p>}

                  {images && images.length && (
                    <>
                      <div className="images" data-images={images.length}>
                        {images.map((image) => (
                          <img src={image} />
                        ))}
                      </div>

                      {imageDesc && <p className="image description">{imageDesc}</p>}
                    </>
                  )}
                </div>

                <div className="actions">
                  <button>
                    <Icon variant={'heart'} />
                    <span>{comments}</span>
                  </button>

                  <button>
                    <Icon variant={'share-01'} />
                    <span>Share</span>
                  </button>

                  <a href="#">
                    <Icon variant={'file-search-01'} />
                    <span>View on Etherscan </span>
                  </a>
                </div>
              </div>
            )
          )
        }
      </div>
    </div>
  )
}

export { Activities }
