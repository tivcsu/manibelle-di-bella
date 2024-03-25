/* eslint-disable react/no-unescaped-entities */
'use client'
import { useContext, useEffect, useState } from 'react';
import { ContentWrapper } from '../content-wrapper/content-wrapper';
import './booking.css';
import DateSelector, { Value } from './date-selector';
import Image from 'next/image';
import UserDetails from './user-details';
import Popup from '../popup/popup';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase.config';
import { LangContext } from '@/app/layout';
import { cormorantGaramond } from '@/styles/fonts';

export default function Booking() {
  const lang = useContext(LangContext)

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState<null | string>(null)
  const [isDateSelectionAvailable, setIsDateSelectionAvailable] = useState<boolean>(true)
  const [bookingStatus, setBookingStatus] = useState<string | null>(null)
  const [bookings, setBookings] = useState<string[] | null>(null)

  const appointmentsCollectionRef = collection(db, 'appointments')

  useEffect(() => {
    if (bookings === null) {
      getBookings();
    }
  }, []);

  const getBookings = async () => {
    const data = await getDocs(appointmentsCollectionRef);
    const appointments = data.docs.map((doc) => (doc.data().date))
    
    setBookings(appointments);
  };

  const handleSelectTime = (date: Value, time: string) => {
    if (date) {
      setSelectedDate(date)
    }
    setSelectedTime(time)
    if (date && time) {
      setIsDateSelectionAvailable(false)
    }
  }
  const handleBackToDateSelector = () => {
    setSelectedDate(new Date())
    setSelectedTime(null)
    setIsDateSelectionAvailable(true)
  }
  const handleBooking = (message: string) => {
    setBookingStatus(message)
  }
  const handleSuccessConfirm = () => {
    setBookingStatus(null)
    setIsDateSelectionAvailable(true)
    getBookings()
  }
  const handleFailureConfirm = () => {
    setSelectedTime(null)
    setSelectedDate(new Date())
    getBookings()
    setBookingStatus(null)
    setIsDateSelectionAvailable(true)
  }
  return (
    <div className='booking' id='contact'>
      <ContentWrapper className='booking-wrapper'>
        <div className="booking-col">
          <div className="images-wrapper">
            <Image className='booking-image bottom' src='/about2.jpg' width={1000} height={2000} alt='Manibelle'/>
            <Image className='booking-image top' src='/booking-image.jpg' width={1000} height={2000} alt='Manibelle'/>
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
          {isDateSelectionAvailable ?
            <DateSelector bookings={bookings ?? []} onSelectTime={handleSelectTime}/> :
            <UserDetails onBooking={handleBooking} onBack={handleBackToDateSelector} date={selectedDate} time={selectedTime ?? ''}/>
          }
          {bookingStatus && <div className='overlay'></div>}
          {bookingStatus === 'success' && <Popup text={lang.booking_successful} onConfirm={handleSuccessConfirm}/>}
          {bookingStatus === 'failed' && <Popup text={lang.booking_failed} onConfirm={handleFailureConfirm}/>}
        </div>
      </ContentWrapper>
    </div>
  )

} 
