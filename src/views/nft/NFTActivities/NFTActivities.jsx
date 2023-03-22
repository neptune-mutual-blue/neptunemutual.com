import { Activities } from './Activities'
import { Leaderboard } from './Leaderboard'
import { Achievements } from './Achievements'

const NFTActivities = () => {
  return (
    <div className="nft home activities section">
      <Activities />

      <div>
        <Leaderboard />
        <Achievements />
      </div>
  </div>
  )
}

export { NFTActivities }
