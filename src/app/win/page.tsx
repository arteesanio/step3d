import styles from '../page.module.css'
import { GameContainer } from '@/GameContainer'

export default function WinPage() {
  return (
    <main className={styles.main}>
      <GameContainer initialLevel="win" />
    </main>
  )
} 