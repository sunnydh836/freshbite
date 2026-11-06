import { useEffect, useState } from 'react'
import './Preloader.css'

const DURATION = 1400
const FADE = 300

const Preloader = ({ onDone }) => {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const fadeTimer = setTimeout(() => setLeaving(true), DURATION - FADE)
    const doneTimer = setTimeout(() => {
      document.body.style.overflow = ''
      onDone?.()
    }, DURATION)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
      document.body.style.overflow = ''
    }
  }, [onDone])

  return (
    <div className={`preloader${leaving ? ' preloader--leaving' : ''}`}>
      <div className="preloader-spinner" />
    </div>
  )
}

export default Preloader
