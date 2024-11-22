import Script from 'next/script'
import styles from '../page.module.css'
import { GameContainer } from '@/GameContainer'
import { GameMapContainer } from '@/components/GameMapContainer'

export default function WinPage() {
  return (
    <main className={styles.main}>
      <GameMapContainer  />
    </main>
  )
} 