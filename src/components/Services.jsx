import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Services.module.css'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: '🖨️',
    title: 'Impressão sob Encomenda',
    desc: 'Trazemos sua ideia à realidade com tecnologia FDM de alta precisão. Envie o modelo ou descreva o que quer.',
    color: 'green',
  },
  {
    icon: '✨',
    title: 'Alta Qualidade',
    desc: 'Filamentos premium, camadas de até 0.1mm e acabamento profissional em cada peça produzida.',
    color: 'blue',
  },
  {
    icon: '⚡',
    title: 'Entrega Rápida',
    desc: 'Prazos ágeis e comunicação transparente do início ao fim do processo de impressão.',
    color: 'green',
  },
  {
    icon: '🎨',
    title: 'Personalização Total',
    desc: 'Cores, tamanhos e materiais variados. Cada projeto é único e feito especialmente para você.',
    color: 'blue',
  },
]

export default function Services() {
  const sectionRef = useRef()
  const cardsRef = useRef([])

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean)
    gsap.fromTo(cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      }
    )
  }, [])

  return (
    <section id="servicos" ref={sectionRef} className={styles.section}>
      <p className="section-subtitle">O QUE OFERECEMOS</p>
      <h2 className="section-title">Nossos Serviços</h2>

      <div className={styles.grid}>
        {services.map((s, i) => (
          <div
            key={i}
            ref={el => cardsRef.current[i] = el}
            className={`${styles.card} ${styles[s.color]}`}
          >
            <div className={styles.icon}>{s.icon}</div>
            <h3 className={styles.cardTitle}>{s.title}</h3>
            <p className={styles.cardDesc}>{s.desc}</p>
            <div className={styles.cardGlow} />
          </div>
        ))}
      </div>
    </section>
  )
}
