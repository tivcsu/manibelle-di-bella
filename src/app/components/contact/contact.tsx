/* eslint-disable react/no-unescaped-entities */
'use client'
import { useContext } from 'react';
import { ContentWrapper } from '../content-wrapper/content-wrapper';
import './contact.css';
import Image from 'next/image';
import { LangContext } from '@/app/layout';
import { useSearchParams } from 'next/navigation';

export default function Booking() {
  const lang = useContext(LangContext)
  const searchParams = useSearchParams()
  
  return (
    <div className='booking' id='contact'>
      <ContentWrapper className='booking-wrapper'>
        <div className="booking-col">
          <div className="images-wrapper">
            <Image className='booking-image bottom' src='/about2.webp' width={50} height={50} alt='Manibelle'/>
            <Image className='booking-image top' src='/booking-image.jpg' width={50} height={50} alt='Manibelle'/>
          </div>
        </div>
        <div className="booking-col">
          <div className="title booking--title">{lang.booking_book_now}</div>
          <div className="text booking--text">
            {lang.booking_text}
          </div>
          <div className='phone-number-wrapper'>
            WhatsApp: <p className="phone-number">+41 78 911 9807</p>
          </div>
          <a href={'/book-appointment' + '?' + searchParams} className='btn btn--secondary'>{lang.online_appointment_booking}</a>
        </div>
      </ContentWrapper>
    </div>
  )

} 
