import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Catalog.module.css'

gsap.registerPlugin(ScrollTrigger)

const products = [
  { title: 'Decoração Personalizada', desc: 'Vasos, esculturas, objetos decorativos únicos para sua casa ou escritório.', tag: 'POPULAR', color: '#00ff88' },
  { title: 'Acessórios Gamer', desc: 'Suportes para headset, organizadores, itens temáticos para seu setup.', tag: 'NOVO', color: '#00aaff' },
  { title: 'Protótipos & Projetos', desc: 'Dê vida à sua ideia com um protótipo funcional de alta precisão.', tag: 'PREMIUM', color: '#00ff88' },
  { title: 'Miniaturas & Colecionáveis', desc: 'Figuras detalhadas, personagens e peças para colecionadores.', tag: 'DESTAQUE', color: '#00aaff' },
  { title: 'Peças Funcionais', desc: 'Suportes, encaixes, componentes de reposição para o dia a dia.', tag: null, color: '#00ff88' },
  { title: 'Chaveiros & Brindes', desc: 'Itens personalizados para presentear com o seu nome ou logo.', tag: null, color: '#00aaff' },
]

function TiltCard({ product, index }) {
  const cardRef = useRef()

  const onMouseMove = (e) => {
    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    gsap.to(card, { rotateY: x * 14, rotateX: -y * 14, duration: 0.3, ease: 'power1.out', transformPerspective: 800 })
  }

  const onMouseLeave = () => {
    gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'power2.out' })
  }

  return (
    <div
      ref={cardRef}
      className={styles.card}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ '--accent': product.color }}
    >
      <div className={styles.cardInner}>
        <div className={styles.cardHeader}>
          <div className={styles.dots}>
            <span style={{ background: product.color }} />
            <span style={{ background: product.color, opacity: 0.5 }} />
            <span style={{ background: product.color, opacity: 0.25 }} />
          </div>
          {product.tag && (
            <span className={styles.tag} style={{ color: product.color, borderColor: product.color + '44' }}>
              {product.tag}
            </span>
          )}
        </div>

        <div className={styles.iconArea}>
          <div className={styles.cube}>
            <span className={styles.cubeIcon}>◈</span>
          </div>
        </div>

        <h3 className={styles.cardTitle}>{product.title}</h3>
        <p className={styles.cardDesc}>{product.desc}</p>

        <a href="#contato" className={styles.cardBtn}>
          Solicitar Orçamento →
        </a>
      </div>
      <div className={styles.cardGlow} />
    </div>
  )
}

export default function Catalog() {
  const sectionRef = useRef()
  const cardsRef = useRef([])

  useEffect(() => {
    gsap.fromTo(cardsRef.current.filter(Boolean),
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.6, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' }
      }
    )
  }, [])

  return (
    <section id="catalogo" ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className="section-subtitle">O QUE PRODUZIMOS</p>
        <h2 className="section-title">Catálogo de Produtos</h2>

        <div className={styles.grid}>
          {products.map((p, i) => (
            <div key={i} ref={el => cardsRef.current[i] = el}>
              <TiltCard product={p} index={i} />
            </div>
          ))}
        </div>

        <p className={styles.note}>
          Não encontrou o que procura? <a href="#contato">Fale conosco</a> — produzimos qualquer ideia!
        </p>
      </div>
    </section>
  )
}
