import styles from './page.module.css'
import { SpawnContainer } from '@/SpawnContainer'
// import WebApp from '@twa-dev/sdk'
import { GameProvider } from '../../script/state/GameContext'

export default function Home() {

  return (
    <main className={styles.main}>
      <GameProvider>
        <SpawnContainer initialLevel="start" />
      </GameProvider>
    </main>
  )
}
