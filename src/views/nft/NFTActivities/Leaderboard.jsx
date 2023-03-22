import { truncateAddress } from '../../../../util/nft'

// @todo: remove mock images from 'public/assets/images/test' after api implementation
const data = [
  {
    avatar: '/assets/images/test/avatar1.png',
    name: 'DasjRollerCoaster',
    address: truncateAddress('0x03b4658fA53bdaC6cedd7C4Fec3E41Ca9777dB84'),
    level: 7
  },
  {
    avatar: '/assets/images/test/avatar1.png',
    name: 'Purple Orchid Isomorphic Galactic Nebula',
    address: truncateAddress('0x03b4658fA53bdaC6cedd7C4Fec3E41Ca9777dB84'),
    level: 10
  },
  {
    avatar: '/assets/images/test/avatar1.png',
    name: 'Yano',
    address: truncateAddress('0x03b4658fA53bdaC6cedd7C4Fec3E41Ca9777dB84'),
    level: 1
  },
  {
    avatar: '/assets/images/test/avatar1.png',
    name: 'I Am Batman',
    address: truncateAddress('0x03b4658fA53bdaC6cedd7C4Fec3E41Ca9777dB84'),
    level: 7
  },
  {
    avatar: '/assets/images/test/avatar1.png',
    name: 'Giant Shining Light Tabular Structure',
    address: truncateAddress('0x03b4658fA53bdaC6cedd7C4Fec3E41Ca9777dB84'),
    level: 3
  }
]

const Leaderboard = () => {
  return (
    <div className="nft leaderboard container">
      <h2>Leaderboard</h2>

      <div className="leaderboard list">
        {
          data.map(({ avatar, name, level, address }, idx) => (
            <div className="item" key={idx}>
              <img src={avatar} />

              <div className="name and address">
                <p className="name">{name}</p>
                <p className="address">{address}</p>
              </div>

              <div className="level">L{level}</div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export { Leaderboard }
