import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useParticles } from '../hooks/useParticles'
import ThreeScene from './ThreeScene'
import styles from './Hero.module.css'

export default function Hero() {
  const canvasRef = useRef()
  const titleRef = useRef()
  const subtitleRef = useRef()
  const btnsRef = useRef()
  const scrollRef = useRef()

  useParticles(canvasRef)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })
    tl.fromTo(titleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' })
    tl.fromTo(subtitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
    tl.fromTo(btnsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
    tl.fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.1')
  }, [])

  return (
    <section id="hero" className={styles.hero}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <ThreeScene />

      <div className={styles.content}>
        <div className={styles.badge}>◆ IMPRESSÃO 3D PROFISSIONAL ◆</div>
        <h1 ref={titleRef} className={styles.title}>
          <span className={styles.gradientText}>PRIME HOUSE</span>
          <span className={styles.accent}> 3D</span>
        </h1>
        <p ref={subtitleRef} className={styles.subtitle}>
          Transformamos suas ideias em objetos reais.<br />
          Qualidade premium, preço justo, entrega rápida.
        </p>
        <div ref={btnsRef} className={styles.buttons}>
          <a href="#catalogo" className={styles.btnPrimary}>Ver Catálogo</a>
          <a href="#contato" className={styles.btnSecondary}>Fazer Encomenda</a>
        </div>
      </div>

      <div ref={scrollRef} className={styles.scrollIndicator}>
        <span>SCROLL</span>
        <div className={styles.scrollLine} />
      </div>

      <div className={styles.grid} />
    </section>
  )
}
