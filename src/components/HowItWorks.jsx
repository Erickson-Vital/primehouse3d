import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './HowItWorks.module.css'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { num: '01', icon: '💬', title: 'Entre em Contato', desc: 'Fale com a gente pelo WhatsApp ou formulário. Descreva sua ideia ou envie o arquivo 3D.' },
  { num: '02', icon: '📐', title: 'Aprovamos & Orçamos', desc: 'Analisamos o projeto, enviamos o orçamento e prazo de entrega em até 24 horas.' },
  { num: '03', icon: '🖨️', title: 'Imprimimos', desc: 'Com aprovação, iniciamos a impressão com filamentos de alta qualidade.' },
  { num: '04', icon: '📦', title: 'Você Recebe!', desc: 'Seu produto chega embalado e protegido, pronto para uso ou presente.' },
]

export default function HowItWorks() {
  const sectionRef = useRef()
  const lineRef = useRef()
  const stepsRef = useRef([])

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' }
    })

    tl.fromTo(lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, ease: 'power2.inOut' }
    )

    tl.fromTo(stepsRef.current.filter(Boolean),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.18, ease: 'power2.out' },
      '-=0.8'
    )
  }, [])

  return (
    <section id="como-funciona" ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className="section-subtitle">SIMPLES E RÁPIDO</p>
        <h2 className="section-title">Como Funciona</h2>

        <div className={styles.timeline}>
          <div ref={lineRef} className={styles.line} />
          {steps.map((step, i) => (
            <div key={i} ref={el => stepsRef.current[i] = el} className={styles.step}>
              <div className={styles.stepNum}>{step.num}</div>
              <div className={styles.stepIcon}>{step.icon}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
