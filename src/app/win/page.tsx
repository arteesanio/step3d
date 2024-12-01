import Script from 'next/script'
import styles from '../page.module.css'
import { SpawnContainer } from '@/SpawnContainer'

export default function WinPage() {
  return (
    <main className={styles.main}>
      <SpawnContainer initialLevel="win" />
    </main>
  )
} 