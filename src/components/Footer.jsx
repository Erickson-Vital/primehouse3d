import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logo}>PRIME<em>HOUSE</em> 3D</span>
            <p>Impressão 3D profissional sob encomenda.<br />Qualidade e criatividade em cada peça.</p>
          </div>
          <div className={styles.nav}>
            <strong>Navegação</strong>
            <a href="#servicos">Serviços</a>
            <a href="#catalogo">Catálogo</a>
            <a href="#como-funciona">Como Funciona</a>
            <a href="#contato">Contato</a>
          </div>
          <div className={styles.nav}>
            <strong>Contato</strong>
            <a href="https://wa.me/5519992368835" target="_blank" rel="noreferrer">WhatsApp</a>
            <a href="mailto:contato@primehouse3d.com">E-mail</a>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.line} />
          <p>© 2025 Prime House 3D · Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
