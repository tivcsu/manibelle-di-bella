'use client'
import { ContentWrapper } from '../content-wrapper/content-wrapper'
import './nails.css'
import Image from 'next/image'
export default function Nails() {
  const nailImgs = ['/nail1.JPG', '/nail7.JPG','/nail3.JPG','/nail4.JPG','/nail5.JPG','/nail6.png']
  return (
    <ContentWrapper className="nails">
      <p className="title nails--title">Follow us</p>
      <div className='nail-images'>
        {nailImgs.map((img, index) => (
          <Image className='nail-image' key={img} src={'/nails' + img} alt={'Manibelle nail' + index} width={1200} height={2000}></Image>
        )) }
      </div>
      <button className="btn btn--outline">
        Check Instagram
      </button>
    </ContentWrapper>
  )
}
