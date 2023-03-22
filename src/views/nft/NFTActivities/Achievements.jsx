import { Icon } from '../../../react-code/components/Icon'

// @todo: remove mock images from 'public/assets/images/test' after api implementation
const data = [
  {
    avatar: '/assets/images/test/avatar1.png',
    name: 'DasjRollerCoaster',
    achievement: 'Reached Level 7!',
    level: 7
  },
  {
    avatar: '/assets/images/test/avatar1.png',
    name: 'Purple Orchid Isomorphic Galactic Nebula',
    achievement: 'Reached Level 5!',
    level: 10
  },
  {
    avatar: '/assets/images/test/avatar1.png',
    name: 'Yano',
    achievement: 'Reached Level 6!',
    level: 1
  },
  {
    avatar: '/assets/images/test/avatar1.png',
    name: 'I Am Batman',
    achievement: 'Reached Level 1!',
    level: 7
  }
]

const Achievements = () => {
  return (
    <>
      <div className="nft achievements container">
        <h2>Achievements</h2>

        <div className="achievements list">
          {
            data.map(({ avatar, name, level, achievement }, idx) => (
              <div className="item" key={idx}>
                <img src={avatar} />

                <div className="name and achievement">
                  <p className="name">{name}</p>
                  <p className="achievement">{achievement}</p>
                </div>

                <div className="level">L{level}</div>
              </div>
            ))
          }
        </div>
      </div>

      <a href="#" className="set your persona">
          <div className='text'>
            <span>Set your persona</span>
            <p>Are you a Guardian or a Beast?</p>
          </div>
          <Icon variant={'arrow-right'} />
      </a>
    </>
  )
}

export { Achievements }
