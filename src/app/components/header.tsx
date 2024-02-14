'use client'
import Image from 'next/image'
import { cormorantGaramond, cocoGothic } from "../../styles/fonts"
import '../page.css'
import { ContentWrapper } from './content-wrapper/content-wrapper'


export default function Header() {
  return (
    <ContentWrapper className="header">
      <div className={"header__title " + cormorantGaramond.className}>
        <span>Welcome to </span>
        <br className='header__title-linebreak'/>
        <span className='uppercase'>Manibelle</span>  
      </div>
      <p className="header__sub-title">
        Where Art Meets Your Nails
      </p>
      <p className='header__text'>
        Manibelle is where style meets substance. 
        Immerse yourself in a world of glamour, sophistication, and creativity. 
        Elevate your nails, elevate yourself.
      </p>
      <button className="btn">
        Book an appointment
      </button>
      <div className="header__images">
        <div className="header__image-wrapper left">
          <Image className="header__image" src="/header-image-2.JPG" alt="header-image-2" width={400} height={700} loading='lazy'/>
        </div>
          <div className="header__image-wrapper main">
          <Image className="header__image" src="/header-image-1.png" alt="header-image-1" width={400} height={700} loading='lazy'/>
        </div>
        <div className="header__image-wrapper right">
          <Image className="header__image" src="/header-image-3.png" alt="header-image-3" width={400} height={700} loading='lazy'/>
        </div>
      </div>
    </ContentWrapper>
  )
}
