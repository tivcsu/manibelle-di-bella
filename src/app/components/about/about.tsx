'use client'
import Image from 'next/image'
import './about.css'
import { ContentWrapper } from '../content-wrapper/content-wrapper'


export default function About() {
  const aboutSections = [
    {
      title: 'About Manibelle',
      text: 'At Manibelle, we believe that beauty lies in the details. Our journey began with a passion for nail artistry, a commitment to quality, and a desire to create a sanctuary where clients can escape the ordinary and embrace the extraordinary.',
      image: '/about1.jpg'
    },
    {
      title: 'Client-Centric Care',
      text: 'Your comfort and satisfaction are at the heart of everything we do. Our personalized approach ensures that each visit to Manibelle is a tailored experience, leaving you feeling pampered and refreshed.',
      image: '/about2.jpg'
    },
    {
      title: 'Elevate Your Style',
      text: "Whether you're seeking a chic, minimalist look or a bold, statement-making design, Manibelle is here to bring your vision to life. Let your nails be the canvas that tells your story.",
      image: '/about3.jpg'
    },
  ]
  return (
    <div className="about">
      {aboutSections.map((section, index) => (
        <ContentWrapper key={section.title} className={"about-section" + ' ' + (index % 2 === 0 ? 'reverse' : '')}>
          <div className="texts-wrapper">
            <div className='title'>
              <p className='title__number'>{'0' + (index+1) + '. '}</p>
              <p className='title__text'>{section.title}</p>
            </div>
            <p className='text'>{section.text}</p>
          </div>
          <Image className={'image' + (index === aboutSections.length - 1 ? ' last' : '')} src={section.image} alt={section.title} width={1200} height={2400}/>
        </ContentWrapper>
      ))}
    </div>
  )
}
