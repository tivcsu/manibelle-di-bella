'use client'
import Image from 'next/image'
import { nunito } from '@/styles/fonts'
import { ContentWrapper } from '../components/content-wrapper/content-wrapper'
import './about-me.css'
import { useContext } from 'react'
import { LangContext } from '../layout'
import { useSearchParams } from 'next/navigation'

export default function AboutMe() {
  const lang = useContext(LangContext)
  const searchParams = useSearchParams()

  return (
    <div className="about-me">
      <ContentWrapper className="about-section">
        <div className="texts-wrapper">
          <p className={'text' + ' ' + nunito.className}>{lang.about_me_section1}</p>
        </div>
        <Image className='image' src='/about-me2.webp' alt='Manibelle - My first studio in Massagno' width={1200} height={2400}/>
      </ContentWrapper>
      <ContentWrapper className="about-section reverse">
        <div className="texts-wrapper">
          <p className={'text' + ' ' + nunito.className}>{lang.about_me_section2}</p>
        </div>
        <Image className='image' src='/about-me3.jpeg' alt='Manibelle - 1st place at the nailympics, London' width={1200} height={2400}/>
      </ContentWrapper>
      <ContentWrapper className="about-section">
        <div className="texts-wrapper">
          <p className={'text' + ' ' + nunito.className}>{lang.about_me_section3}</p>
        </div>
        <Image className='image' src='/about-me4.webp' alt='Manibelle - Camp' width={1200} height={2400}/>
      </ContentWrapper>
      <ContentWrapper>
        <div className="button-row">
          <a href={'/book-appointment' + '?' + searchParams} className='btn'>{lang.book_appointment}</a>
        </div>
      </ContentWrapper>
    </div>
  )
}
