import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Stats.module.css'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 150, suffix: '+', label: 'Projetos Entregues' },
  { value: 50, suffix: '+', label: 'Clientes Felizes' },
  { value: 8, suffix: '', label: 'Materiais Disponíveis' },
  { value: 24, suffix: 'h', label: 'Prazo de Orçamento' },
]

export default function Stats() {
  const sectionRef = useRef()
  const numsRef = useRef([])

  useEffect(() => {
    numsRef.current.filter(Boolean).forEach((el, i) => {
      const stat = stats[i]
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
        onEnter: () => {
          gsap.fromTo({ val: 0 }, { val: stat.value }, {
            duration: 1.8,
            ease: 'power2.out',
            onUpdate() { el.textContent = Math.round(this.targets()[0].val) + stat.suffix }
          })
        }
      })
    })

    gsap.fromTo(sectionRef.current.querySelectorAll('[data-stat]'),
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      }
    )
  }, [])

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        {stats.map((s, i) => (
          <div key={i} data-stat className={styles.stat}>
            <div className={styles.value}>
              <span ref={el => numsRef.current[i] = el}>0{s.suffix}</span>
            </div>
            <div className={styles.label}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
