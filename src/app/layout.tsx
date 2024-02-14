'use client'
import Image from 'next/image'
import './globals.css'
import { useCallback, useEffect } from 'react'
import { cocoGothic } from "../styles/fonts"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const handleMenuClick = () => {
    const menu = document.querySelector('.navbar-menu');
    const menuButton = document.querySelector('.navbar__menu-button');
    if (menu?.classList.contains('show')) {
      menu.classList.remove('show')
      menuButton?.classList.remove('close')
    } else {
      menu?.classList.add('show')
      menuButton?.classList.add('close')
    }
  }

  const onScroll = useCallback((event: Event) => {
    event.preventDefault()
    const { scrollY } = window;
    const navbar = document.querySelector('.navbar-wrapper');
    
    if (scrollY > 0) {
      navbar?.classList.add('with-background')
    } else {
      navbar?.classList.remove('with-background')
    }
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
   }
  }, [])
  return (
    <html lang="en" className={cocoGothic.className}>
      <title>Manibelle</title>
      <body>
      <div className="navbar-wrapper">
        <nav className='navbar'>
          <div className="navbar-logo">
            <Image className="navbar-logo__image" src="/manibelle-logo-black.png" alt="Manibelle Logo" width={100} height={40} loading='lazy'/>
          </div>
          <ul className='navbar-menu'>
            <li className="navbar-menu__item">
              <a href="#home" onClick={handleMenuClick}>Home</a>
            </li>
            <li className="navbar-menu__item">
              <a href="#about-me" onClick={handleMenuClick}>About</a>
            </li>
            <li className="navbar-menu__item">
              <a href="#nails" onClick={handleMenuClick}>Nails</a>
            </li>
            <li className="navbar-menu__item">
              <a href="#contact" onClick={handleMenuClick}>Contact</a>
            </li>
          </ul>
          <div className="navbar__menu-button" onClick={handleMenuClick}></div>
        </nav>
      </div>
        <main>{children}</main>
      </body>
    </html>
  )
}
