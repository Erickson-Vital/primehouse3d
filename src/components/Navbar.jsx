import { useEffect, useRef, useState } from 'react'
import styles from './Navbar.module.css'

const links = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#catalogo', label: 'Catálogo' },
  { href: '#como-funciona', label: 'Como Funciona' },
  { href: '#contato', label: 'Contato' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navRef = useRef()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav ref={navRef} className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <a href="#hero" className={styles.logo}>
        PRIME<span>HOUSE</span><em>3D</em>
      </a>

      <ul className={`${styles.links} ${open ? styles.open : ''}`}>
        {links.map(l => (
          <li key={l.href}>
            <a href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          </li>
        ))}
        <li>
          <a href="#contato" className={styles.ctaBtn} onClick={() => setOpen(false)}>
            Fazer Encomenda
          </a>
        </li>
      </ul>

      <button className={`${styles.burger} ${open ? styles.burgerOpen : ''}`} onClick={() => setOpen(o => !o)}>
        <span /><span /><span />
      </button>
    </nav>
  )
}
