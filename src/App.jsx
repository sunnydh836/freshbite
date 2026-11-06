import { useState } from 'react'
import './App.css'
import useLenis from './lib/useLenis'
import Preloader from './components/Preloader'
import FoodHero from './components/FoodHero'

function App() {
  useLenis()
  const [loading, setLoading] = useState(true)

  return (
    <>
      {loading && <Preloader onDone={() => setLoading(false)} />}
      <FoodHero />
    </>
  )
}

export default App
