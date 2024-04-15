/* eslint-disable react/no-unescaped-entities */
'use client'
import Image from 'next/image'
import { cormorantGaramond } from "../../styles/fonts"
import '../page.css'
import { ContentWrapper } from './content-wrapper/content-wrapper'
import { useContext } from 'react'
import { LangContext } from '../layout'


export default function Header() {
  const lang = useContext(LangContext)
  return (
    <ContentWrapper className="header">
      <div className={"header__title " + cormorantGaramond.className} id='home'>
        <span>{lang.header_welcome}</span>
        <br className='header__title-linebreak'/>
        <span className='uppercase'>Manibelle</span>
      </div>
      <p className="header__sub-title">
        {lang.header_subtitle}
      </p>
      <p className='header__text'>
        {lang.header_text}
      </p>
      <a href='#contact' className="btn">
        {lang.book_appointment}
      </a>
      <div className="header__images">
        <div className="header__image-wrapper left">
          <Image className="header__image" src="/header-image-2.png" alt="header-image-2" width={1} height={1} loading='eager' priority/>
        </div>
          <div className="header__image-wrapper main">
          <Image className="header__image" src="/header-image-1.jpg" alt="header-image-1" width={1} height={1} loading='eager' priority/>
        </div>
        <div className="header__image-wrapper right">
          <Image className="header__image" src="/header-image-3.jpg" alt="header-image-3" width={1} height={1} loading='eager' priority/>
        </div>
      </div>
    </ContentWrapper>
  )
}
