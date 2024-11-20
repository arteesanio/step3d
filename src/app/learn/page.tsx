import styles from '../page.module.css'
import { SSContainer } from '@/SSContainer'
import { GameProvider } from '../../../script/state/GameContext'

export default function Learn() {
  return (
    <main className={styles.main}>
      <GameProvider>
        <SSContainer initialLevel="start" />
      </GameProvider>
    </main>
  )
} 