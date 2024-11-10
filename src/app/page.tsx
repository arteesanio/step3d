import styles from './page.module.css'
import { GameContainer } from '@/GameContainer'
import WebApp from '@twa-dev/sdk'

export default function Home() {

  return (
    <main className={styles.main}>
      <GameContainer initialLevel="start" />
    </main>
  )
}
