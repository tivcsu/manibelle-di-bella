'use client'
import Image from 'next/image'
import './about.css'
import { ContentWrapper } from '../content-wrapper/content-wrapper'
import { useCallback, useContext, useState } from 'react'
import { LangContext } from '@/app/layout'
import { nunito } from '@/styles/fonts'


export default function About() {
  const lang = useContext(LangContext)
  const [isAboutMeCollapsed, setIsAboutMeCollapsed] = useState(true)

  const aboutSections = [
    {
      title: lang.about_about_manibelle_title,
      text: lang.about_about_manibelle_text,
      image: '/about1.jpg'
    },
    {
      title: lang.about_client_centric_care_title,
      text: lang.about_client_centric_care_text,
      image: '/about2.webp'
    },
    {
      title: lang.about_elevate_your_style_title,
      text: lang.about_elevate_your_style_text,
      image: '/about3.webp'
    },
  ]

  const onToggleAboutMe = useCallback(() => {
    setIsAboutMeCollapsed(prev => !prev)
  }, [])

  return (
    <div className="about" id='about-me'>
      <ContentWrapper className="about-section">
        <Image className='image image-mid' src='/about-me1.webp' alt='Manibelle - About me' width={1200} height={2400}/>
        <div className="texts-wrapper">
          <div className='title'>
            <p className='title__number'>{'01'}</p>
            <p className='title__text'>{lang.about_about_me_title}</p>
          </div>
          <p className={'text' + ' ' + nunito.className}>{lang.about_about_me_text}</p>
          <div className="button-row">
            <button className='btn' onClick={onToggleAboutMe}>{isAboutMeCollapsed ? lang.read_my_story : lang.hide_my_story}</button>
          </div>
        </div>
      </ContentWrapper>
      <div className={"about-me" + (isAboutMeCollapsed ? ' collapsed' : '')}>
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
          <Image className='image' src='/about-me3.jpg' alt='Manibelle - 1st place at the nailympics, London' width={1200} height={2400}/>
        </ContentWrapper>
        <ContentWrapper className="about-section">
          <div className="texts-wrapper">
            <p className={'text' + ' ' + nunito.className}>{lang.about_me_section3}</p>
          </div>
          <Image className='image' src='/about-me4.webp' alt='Manibelle - Camp' width={1200} height={2400}/>
        </ContentWrapper>
        <div className="button-row">
          <button className='btn btn--outline' onClick={onToggleAboutMe}>{lang.hide_my_story}</button>
        </div>

      </div>

      {aboutSections.map((section, index) => (
        <ContentWrapper key={section.title} className={"about-section" + ' ' + (index % 2 === 1 ? 'reverse' : '')}>
          <div className="texts-wrapper">
            <div className='title'>
              <p className='title__number'>{'0' + (index+2) + '. '}</p>
              <p className='title__text'>{section.title}</p>
            </div>
            <p className={'text' + ' ' + nunito.className}>{section.text}</p>
          </div>
          <Image className={'image' + (index === aboutSections.length - 1 ? ' last' : '')} src={section.image} alt={section.title} width={1200} height={2400}/>
        </ContentWrapper>
      ))}
    </div>
  )
}
