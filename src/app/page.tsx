import styles from './page.module.css'
import { GameContainer } from '@/GameContainer'

export default function Home() {
  return (
    <main className={styles.main}>
      <GameContainer initialLevel="start" />
    </main>
  )
}
