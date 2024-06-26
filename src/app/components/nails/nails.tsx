'use client'
import { useContext } from 'react'
import { ContentWrapper } from '../content-wrapper/content-wrapper'
import './nails.css'
import Image from 'next/image'
import { LangContext } from '@/app/layout'
export default function Nails() {
  const lang = useContext(LangContext)
  
  const nailImgs = ['/nail1.JPG', '/nail7.JPG','/nail3.JPG','/nail4.JPG','/nail5.JPG','/nail6.png']
  return (
    <ContentWrapper className="nails">
      <p className="title nails--title">{lang.follow_us}</p>
      <div className='nail-images'>
        {nailImgs.map((img, index) => (
          <Image className='nail-image' key={img} src={'/nails' + img} alt={'Manibelle nail' + index} width={1200} height={2000}></Image>
        )) }
      </div>
      <a href='https://www.instagram.com/manibelle_di_bella_/' className="btn btn--outline" target='_blank'>
        {lang.check_instagram}
      </a>
    </ContentWrapper>
  )
}
