'use client'
import Image from 'next/image'
import './about.css'
import { ContentWrapper } from '../content-wrapper/content-wrapper'
import { useCallback, useContext, useState } from 'react'
import { LangContext } from '@/app/layout'
import { nunito } from '@/styles/fonts'
import { useSearchParams } from 'next/navigation'


export default function About() {
  const lang = useContext(LangContext)
  const searchParams = useSearchParams()

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

  return (
    <div className="about" id='about-me'>
      <ContentWrapper className="about-section">
        <Image className='image image-mid' src='/about-me1.webp' alt='Manibelle - About me' width={1200} height={2400}/>
        <div className="texts-wrapper">
          <div className='title'>
            <p className='title__number'>{'01. '}</p>
            <p className='title__text'>{lang.about_about_me_title}</p>
          </div>
          <p className={'text' + ' ' + nunito.className}>{lang.about_about_me_text}</p>
          <div className="button-row">
            <a href={'/about-me' + '?' + searchParams} className='btn'>{lang.read_my_story}</a>
          </div>
        </div>
      </ContentWrapper>
      
      <ContentWrapper key={aboutSections[0].title} className="about-section">
        <div className="texts-wrapper">
          <div className='title'>
            <p className='title__number'>{'02. '}</p>
            <p className='title__text'>{aboutSections[0].title}</p>
          </div>
          <p className={'text' + ' ' + nunito.className}>{aboutSections[0].text}</p>
          <p className={'text' + ' ' + nunito.className}>{aboutSections[1].text}</p>
          <p className={'text' + ' ' + nunito.className}>{aboutSections[2].text}</p>

          <div className="button-row">
            <a className='btn' href={'/pricing' + '?' + searchParams}>{lang.navbar_pricing}</a>
          </div>
        </div>
        <Image className='image last' src={aboutSections[0].image} alt={aboutSections[0].title} width={1200} height={2400}/>
      </ContentWrapper>
    </div>
  )
}
