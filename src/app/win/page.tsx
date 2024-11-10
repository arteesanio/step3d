import Script from 'next/script'
import styles from '../page.module.css'
import { GameContainer } from '@/GameContainer'

export default function WinPage() {
  return (
    <main className={styles.main}>
      <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive" // ensures the script loads before the page renders
        />
      <GameContainer initialLevel="win" />
    </main>
  )
} 