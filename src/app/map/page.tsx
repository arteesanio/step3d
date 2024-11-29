import Script from 'next/script'
import styles from '../page.module.css'
import { GameContainer } from '@/GameContainer'
import { GameMapContainer } from '@/model/level/map/GameMapContainer'
// import { GameMapContainer } from '@/components/GameMapContainer'

export default function WinPage() {
  return (
    <div style={{ 
      background: 'linear-gradient(-45deg, #ffffff,#ffffff)',
      width: '100vw',
      height: '100vh',
    }}>
      <GameMapContainer />
    </div>
  )
} 