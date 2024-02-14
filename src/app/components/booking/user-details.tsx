'use client'
import { useEffect, useState } from 'react'
import './user-details.css'
import { db } from '@/firebase.config'
import { addDoc, collection } from 'firebase/firestore'
import Spinner from '../spinner/spinner'
//import emailjs from '@emailjs/browser'
import { IAppointment } from './date-selector'

interface IProps {
  appointment?: IAppointment
  date: Date
  time: string
  onBack: () => void
  onBooking: (message: 'success' | 'failed') => void
}

interface IUserDetails {
  appointmentType: string
  comment: string
  date: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
}
interface IErrors {
  appointmentType: boolean
  comment: boolean
  date: boolean
  email: boolean
  firstName: boolean
  lastName: boolean
  phoneNumber: boolean
}

const UserDetails = ({onBooking, onBack, appointment, date, time}: IProps) => {
  const [userDetails, setUserDetails] = useState<IUserDetails>({} as IUserDetails)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<IErrors>({} as IErrors)

  useEffect(() => {
    if (Object.values(userDetails).length) {
      validateUserDetails()
    }
  }, [userDetails])

  const daysOfTheWeek = ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat']
  const monthsOfTheYear = ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December']
  const formatDate = (date: Date) =>  `${monthsOfTheYear[date.getMonth()]} ${date.getUTCDate()}. (${daysOfTheWeek[date.getDay()]})`

  const appointmentsCollectionRef = collection(db, 'appointments')

  const handleBooking = async () => {
    validateUserDetails()
    if (Object.values(error).length && !Object.values(error).some(el => el)) {
      bookAppointment()
    }
  }

  const validateUserDetails = () => {
    setError({
      ...error,
      firstName: userDetails.firstName ? !userDetails.firstName : true,
      lastName: userDetails.lastName ? !userDetails.lastName : true,
      phoneNumber: userDetails.phoneNumber ? !validatePhoneNumber(userDetails.phoneNumber) : true,
      email: userDetails.email ? !validateEmail(userDetails.email): true
    })
  }

  const validatePhoneNumber = (phoneNumber: string) => {
    const onlyNumbersRegex = /\d/g
    const numbers = phoneNumber.slice(1)
    if (phoneNumber[0] !== '+' && phoneNumber[0] !== '0') {
      return false
    }
    return onlyNumbersRegex.test(numbers) && phoneNumber.length > 9
  }
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }
  
  const bookAppointment = async () => {
    try{
      setIsLoading(true)
      await addDoc(appointmentsCollectionRef, {
        appointmentType: 'appointment.title',
        comment: userDetails.comment ?? '',
        date: `${date.toISOString().slice(0, 11)}${time}`,
        email: userDetails.email,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        phoneNumber: userDetails.phoneNumber,
      });
      onBooking('success')
      setIsLoading(false)
      sendEmail()
    } catch (err) {
      console.warn('A foglalás nem sikerült', err);
      onBooking('failed')
      setIsLoading(false)
    }
  }

  const sendEmail = () => {
    const templateParams = {
      customer_name: `${userDetails.lastName} ${userDetails.firstName}`,
      customer_phone: userDetails.phoneNumber,
      customer_email: userDetails.email,
      booking_date: `${date.toISOString().slice(0, 10)} - ${time}`,
      booking_appointment: 'appointment.title',
      booking_comment: userDetails.comment
    }
    // emailjs.send('booking_email_gmail', 'new_booking', templateParams, 'ps1Ab9mdYE4eeMwip')
  }
 
  return (
    <div className="user-details-wrapper container">
    <div className='appointment-user-details'>
      <div className="appointment-details">
        <div className="appointment-details__date">{date.toDateString()}</div>
        <div className="appointment-details__appointment-type">{'appointment.title'}</div>
        <div className="appointment-details__time">{time}</div>
        <div className="appointment-details__appointment-duration">{'appointment.duration'}</div>
        <button className='btn booking--btn top-margin' onClick={() => onBack()}>{'Back'}</button>
      </div>
      
      <div className="user-details">
        <p className="user-details__title">{'Data required for booking'}</p>
        <div className="user-detail">
          <div className="user-detail__title">{'Last name'}</div>
          <input className={`${error.lastName ? 'error' : ''} cap`} type="text" placeholder={'Last name'} onChange={(e) => setUserDetails({...userDetails, lastName: e.target.value.toUpperCase()})}/>
          <p className={`user-detail__error ${error.lastName ? '' : 'hidden'}`}>{'Please enter your last name!'}</p>
        </div>
        <div className="user-detail">
          <div className="user-detail__title">{'First name'}</div>
          <input className={`${error.firstName ? 'error' : ''} cap`} type="text" placeholder={'First name'} onChange={(e) => setUserDetails({...userDetails, firstName: e.target.value.toUpperCase()})}/>
          <p className={`user-detail__error ${error.firstName ? '' : 'hidden'}`}>{'Please enter your first name!'}</p>
        </div>
        <div className="user-detail">
          <div className="user-detail__title">{'Phone number'}</div>
          <input className={`${error.phoneNumber ? 'error' : ''}`} type="tel" placeholder={'Phone number'} onChange={(e) => setUserDetails({...userDetails, phoneNumber: e.target.value})}/>
          <p className={`user-detail__error ${error.phoneNumber ? '' : 'hidden'}`}>{'Please enter a valid phone number'}</p>
        </div>
        <div className="user-detail">
          <div className="user-detail__title">Email</div>
          <input className={`${error.email ? 'error' : ''}`} type="email" placeholder={'Email address'} onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}/>
          <p className={`user-detail__error ${error.email ? '' : 'hidden'}`}>{'Please enter a valid email!'}</p>
        </div>
        <div className="user-detail">
          <div className="user-detail__title">{'Comment'}</div>
          <input type="text"onChange={(e) => setUserDetails({...userDetails, comment: e.target.value})}/>
        </div>
        
        <button className='btn booking--btn' onClick={handleBooking}>
          {isLoading ? <Spinner /> : ('Booking')}
        </button>
      </div>
    </div>
    </div>
  )
}

export default UserDetails
