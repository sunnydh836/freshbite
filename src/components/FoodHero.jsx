import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import menuItems from '../data/menuItems'
import SocialIcons from './SocialIcons'
import './FoodHero.css'

const FoodHero = () => {
  const [index, setIndex] = useState(0)
  const [cartCount, setCartCount] = useState(2)
  const animating = useRef(false)

  const imageRef = useRef(null)
  const bgRef = useRef(null)
  const titleRef = useRef(null)
  const descRef = useRef(null)
  const navRef = useRef(null)
  const footerRef = useRef(null)

  const current = menuItems[index]

  // Opening fade-in, timed to cross-fade with the preloader's own fade-out
  useLayoutEffect(() => {
    gsap.set(bgRef.current, { opacity: 0 })
    gsap.set(navRef.current, { opacity: 0, y: -16 })
    gsap.set([imageRef.current, titleRef.current], { opacity: 0 })
    gsap.set(imageRef.current, { scale: 0.85 })
    gsap.set(footerRef.current, { opacity: 0, y: 24 })

    const tl = gsap.timeline({ delay: 1.05 })

    tl.to(bgRef.current, { opacity: 1, duration: 0.7, ease: 'power2.out' })
      .to(navRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '<0.05')
      .to(
        titleRef.current,
        { opacity: 1, duration: 0.6, ease: 'power2.out' },
        '<0.1'
      )
      .to(
        imageRef.current,
        { opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out' },
        '<0.05'
      )
      .to(
        footerRef.current,
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '<0.15'
      )

    return () => tl.kill()
  }, [])

  const goTo = (nextIndex) => {
    if (animating.current) return
    animating.current = true
    setCartCount((c) => c + 1)

    const tl = gsap.timeline({
      onComplete: () => {
        animating.current = false
      },
    })

    // Zoom in + fade out current image, fade out text
    tl.to(imageRef.current, {
      scale: 1.6,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
    })
      .to(
        [titleRef.current, descRef.current],
        {
          opacity: 0,
          y: -20,
          duration: 0.35,
          ease: 'power2.in',
        },
        '<'
      )
      .to(
        bgRef.current,
        {
          duration: 0.5,
          backgroundColor: menuItems[nextIndex].bg,
          ease: 'power2.inOut',
        },
        '<'
      )
      .add(() => {
        setIndex(nextIndex)
      })
      .set(imageRef.current, { scale: 0.5, opacity: 0 })
      .set([titleRef.current, descRef.current], { y: 20 })
      .to(imageRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
      })
      .to(
        [titleRef.current, descRef.current],
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        '<0.1'
      )
  }

  const handleNext = () => {
    const nextIndex = (index + 1) % menuItems.length
    goTo(nextIndex)
  }

  const handlePrev = () => {
    const prevIndex = (index - 1 + menuItems.length) % menuItems.length
    goTo(prevIndex)
  }

  return (
    <section
      ref={bgRef}
      className="food-hero"
      style={{ backgroundColor: current.bg, color: current.text }}
    >
      <nav ref={navRef} className="food-hero-nav">
        <div className="food-hero-logo">
          <span className="food-hero-logo-dot" style={{ background: current.accent }} />
          FRESHBITE
        </div>
        <ul className="food-hero-menu">
          <li>All Items</li>
          <li>Roll</li>
          <li>Burger</li>
          <li>New Arrivals</li>
        </ul>
        <div className="food-hero-actions">
          <button className="food-hero-icon-btn" aria-label="search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <button className="food-hero-icon-btn food-hero-cart" aria-label="cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 4h2l1.2 12.4A2 2 0 0 0 9.2 18h8.1a2 2 0 0 0 2-1.7L20.5 8H6.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="10" cy="21" r="1.4" fill="currentColor" />
              <circle cx="17" cy="21" r="1.4" fill="currentColor" />
            </svg>
            <span className="food-hero-cart-badge">{cartCount}</span>
          </button>
        </div>
      </nav>

      <div className="food-hero-stage">
        <h1 ref={titleRef} className="food-hero-bgtext">
          {current.title}
        </h1>

        <div className="food-hero-image-wrap">
          <img ref={imageRef} src={current.image} alt={current.title} className="food-hero-image" />
        </div>

        <div ref={footerRef} className="food-hero-footer">
          <p ref={descRef} className="food-hero-desc">
            {current.description}
          </p>

          <button className="food-hero-order">
            Order Now
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="food-hero-nav-btns">
            <button className="food-hero-nav-btn" onClick={handlePrev} aria-label="previous">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button className="food-hero-nav-btn" onClick={handleNext} aria-label="next">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="food-hero-dots">
        {menuItems.map((item, i) => (
          <button
            key={item.id}
            className={`food-hero-dot${i === index ? ' food-hero-dot--active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={item.title}
          />
        ))}
      </div>

      <SocialIcons className="social-icons--dark food-hero-social" />
    </section>
  )
}

export default FoodHero
