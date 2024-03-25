'use client'
import Image from 'next/image'
import './globals.css'
import { createContext, useCallback, useEffect, useState } from 'react'
import { cocoGothic } from "../styles/fonts"
import { Lang, getLang } from '@/lang/get-lang'

export const LangContext = createContext({} as Lang)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [selectedLang, setSelectedLang] = useState('');
  const [lang, setLang] = useState({
    selectedLang: selectedLang,
    ...getLang(selectedLang)
  })

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

  const onChangeLanguage = () => {
    setSelectedLang(selectedLang === 'EN' ? 'IT' : 'EN')
    handleMenuClick()
  }

  useEffect(() => {
    const currentLang = localStorage.getItem('language')
    if (!currentLang) {
      localStorage.setItem('language', selectedLang)
    } else {
      setSelectedLang(currentLang)
    }

    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
   }
  }, [])

  useEffect(() => {
    setLang({
      selectedLang: selectedLang,
      ...getLang(selectedLang)
    })
    localStorage.setItem('language', selectedLang)
  }, [selectedLang])
  return (
    <html lang="en" className={cocoGothic.className}>
      <meta name="description" content="Manibelle - Dove l'arte incontra le unghie"></meta>
      <title>Manibelle</title>
      <LangContext.Provider value={lang}>
        <body>
        <div className="navbar-wrapper">
          <nav className='navbar'>
            <div className="navbar-logo">
              <Image className="navbar-logo__image" src="/manibelle-logo-black.png" alt="Manibelle Logo" width={150} height={60} loading='lazy'/>
            </div>
            <ul className='navbar-menu'>
              <li className="navbar-menu__item">
                <a href="#home" onClick={handleMenuClick}>{lang.navbar_home}</a>
              </li>
              <li className="navbar-menu__item">
                <a href="#about-me" onClick={handleMenuClick}>{lang.navbar_about}</a>
              </li>
              <li className="navbar-menu__item">
                <a href="#contact" onClick={handleMenuClick}>{lang.navbar_contact}</a>
              </li>
              <div className="navbar-separator"></div>
              <li className="navbar-menu__item lang-btn">
                <button onClick={onChangeLanguage}>{selectedLang === 'EN' ? 'IT' : 'EN'}</button>
              </li>
            </ul>
            <div className="navbar__menu-button" onClick={handleMenuClick}></div>
          </nav>
        </div>
          <main>{children}</main>
        </body>
      </LangContext.Provider>
    </html>
  )
}
