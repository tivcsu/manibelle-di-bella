'use client'
import { useEffect, useState } from 'react';
import { ContentWrapper } from '../content-wrapper/content-wrapper';
import './booking.css';
import DateSelector, { Value } from './date-selector';
import Image from 'next/image';
import UserDetails from './user-details';
import Popup from '../popup/popup';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase.config';

export default function Booking() {
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
    <div className='booking'>
      <ContentWrapper className='booking-wrapper'>
        <div className="booking-col">
          <div className="images-wrapper">
            <Image className='booking-image bottom' src='/about2.jpg' width={1000} height={2000} alt='Manibelle'/>
            <Image className='booking-image top' src='/booking-image.jpg' width={1000} height={2000} alt='Manibelle'/>
          </div>
        </div>
        <div className="booking-col">
          <div className="title booking--title">Book now</div>
          <div className="text booking--text">
            Ready to experience the artistry of Manibelle? 
            Schedule your appointment now and let me create a masterpiece with your nails. 
            Please select your preferred date and time, 
            and we`ll ensure your visit is nothing short of extraordinary.
          </div>
          {isDateSelectionAvailable ?
            <DateSelector bookings={bookings ?? []} onSelectTime={handleSelectTime}/> :
            <UserDetails onBooking={handleBooking} onBack={handleBackToDateSelector} date={selectedDate} time={selectedTime ?? ''}/>
          }
          {bookingStatus && <div className='overlay'></div>}
          {bookingStatus === 'success' && <Popup text={'Successful booking!'} onConfirm={handleSuccessConfirm}/>}
          {bookingStatus === 'failed' && <Popup text={'Booking failed, please try again!'} onConfirm={handleFailureConfirm}/>}
        </div>
      </ContentWrapper>
    </div>
  )

} 
