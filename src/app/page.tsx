import styles from './page.module.css'
import { GameContainer } from '@/GameContainer'
// import WebApp from '@twa-dev/sdk'
import { GameProvider } from '../../script/state/GameContext'

export default function Home() {

  return (
    <main className={styles.main}>
      <GameProvider>
        <GameContainer initialLevel="start" />
      </GameProvider>
    </main>
  )
}
