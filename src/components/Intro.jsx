import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './Intro.module.css'

export default function Intro({ onComplete }) {
  const overlayRef = useRef()
  const scanRef = useRef()
  const lettersRef = useRef([])
  const taglineRef = useRef()
  const progressRef = useRef()
  const labelRef = useRef()

  const text = 'PRIME HOUSE 3D'

  useEffect(() => {
    gsap.set(lettersRef.current, { opacity: 0, y: 30 })
    gsap.set([taglineRef.current, labelRef.current], { opacity: 0 })
    gsap.set(progressRef.current, { scaleX: 0, transformOrigin: 'left' })

    const tl = gsap.timeline()

    tl.fromTo(scanRef.current,
      { top: '100%', opacity: 1 },
      { top: '45%', duration: 0.7, ease: 'power3.inOut' }
    )
    tl.to(scanRef.current, { opacity: 0, duration: 0.2 }, '+=0.05')

    tl.to(lettersRef.current, {
      opacity: 1, y: 0,
      duration: 0.07,
      stagger: 0.07,
      ease: 'back.out(2)'
    }, '-=0.1')

    tl.to(taglineRef.current, { opacity: 1, duration: 0.5 }, '-=0.3')
    tl.to(labelRef.current, { opacity: 1, duration: 0.3 })

    tl.to(progressRef.current, {
      scaleX: 1,
      duration: 1.4,
      ease: 'power2.inOut'
    })

    tl.to({}, { duration: 0.4 })

    tl.to(overlayRef.current, {
      opacity: 0, duration: 0.8, ease: 'power2.inOut',
      onComplete
    })
  }, [])

  return (
    <div ref={overlayRef} className={styles.overlay}>
      <div className={styles.grid} />
      <div ref={scanRef} className={styles.scanline} />

      <div className={styles.content}>
        <div className={styles.badge}>◆ IMPRESSÃO 3D PREMIUM ◆</div>
        <div className={styles.title}>
          {text.split('').map((char, i) => (
            <span
              key={i}
              ref={el => { lettersRef.current[i] = el }}
              className={char === ' ' ? styles.space : styles.letter}
            >
              {char === ' ' ? ' ' : char}
            </span>
          ))}
        </div>
        <div ref={taglineRef} className={styles.tagline}>
          SUA IDEIA, IMPRESSA EM REALIDADE
        </div>

        <div className={styles.progressWrapper}>
          <div className={styles.progressTrack}>
            <div ref={progressRef} className={styles.progressFill} />
          </div>
          <span ref={labelRef} className={styles.label}>INICIANDO SISTEMA...</span>
        </div>
      </div>

      <div className={styles.corners}>
        <span className={styles.cornerTL} />
        <span className={styles.cornerTR} />
        <span className={styles.cornerBL} />
        <span className={styles.cornerBR} />
      </div>
    </div>
  )
}
