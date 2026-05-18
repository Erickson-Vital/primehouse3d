import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Contact.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef()
  const formRef = useRef()
  const infoRef = useRef()
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' }
    })
    tl.fromTo(infoRef.current, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' })
    tl.fromTo(formRef.current, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const msg = encodeURIComponent(
      `Olá! Meu nome é ${data.get('name')}.\n\nProjeto: ${data.get('project')}\n\nDetalhes: ${data.get('message')}`
    )
    window.open(`https://wa.me/5519992368835?text=${msg}`, '_blank')
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section id="contato" ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className="section-subtitle">VAMOS CRIAR JUNTOS</p>
        <h2 className="section-title">Fazer Encomenda</h2>

        <div className={styles.grid}>
          <div ref={infoRef} className={styles.info} style={{ opacity: 0 }}>
            <h3 className={styles.infoTitle}>Fale com a gente</h3>
            <p className={styles.infoText}>
              Envie sua ideia, arquivo ou descrição do projeto. Respondemos em até 24 horas com orçamento e prazo.
            </p>

            <div className={styles.contacts}>
              <a href="https://wa.me/5519992368835" target="_blank" rel="noreferrer" className={styles.contactItem}>
                <span className={styles.contactIcon}>📱</span>
                <div>
                  <div className={styles.contactLabel}>WhatsApp</div>
                  <div className={styles.contactVal}>(19) 99236-8835</div>
                </div>
              </a>
              <a href="mailto:contato@primehouse3d.com" className={styles.contactItem}>
                <span className={styles.contactIcon}>📧</span>
                <div>
                  <div className={styles.contactLabel}>E-mail</div>
                  <div className={styles.contactVal}>contato@primehouse3d.com</div>
                </div>
              </a>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📍</span>
                <div>
                  <div className={styles.contactLabel}>Localização</div>
                  <div className={styles.contactVal}>Brasil · Entregas em todo o país</div>
                </div>
              </div>
            </div>
          </div>

          <form ref={formRef} className={styles.form} onSubmit={handleSubmit} style={{ opacity: 0 }}>
            <div className={styles.field}>
              <label>Seu nome</label>
              <input name="name" type="text" placeholder="Como posso te chamar?" required />
            </div>
            <div className={styles.field}>
              <label>Tipo de projeto</label>
              <select name="project" required>
                <option value="">Selecione...</option>
                <option>Decoração Personalizada</option>
                <option>Acessórios Gamer</option>
                <option>Protótipo / Projeto</option>
                <option>Miniatura / Colecionável</option>
                <option>Peça Funcional</option>
                <option>Outro</option>
              </select>
            </div>
            <div className={styles.field}>
              <label>Descreva sua ideia</label>
              <textarea name="message" rows={4} placeholder="Descreva o que você precisa, tamanho, cores, quantidade..." required />
            </div>
            <button type="submit" className={`${styles.submitBtn} ${sent ? styles.sent : ''}`}>
              {sent ? '✓ Redirecionando...' : '🚀 Enviar pelo WhatsApp'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
