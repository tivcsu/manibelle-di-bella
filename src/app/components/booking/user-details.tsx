'use client'
import { useContext, useEffect, useState } from 'react'
import './user-details.css'
import { db } from '@/firebase.config'
import { addDoc, collection } from 'firebase/firestore'
import Spinner from '../spinner/spinner'
import emailjs from '@emailjs/browser'
import { IAppointment } from './date-selector'
import { LangContext } from '@/app/layout'

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
  const lang = useContext(LangContext)

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

  const sendEmail = async () => {
    const templateParams = {
      customer_name: `${userDetails.firstName} ${userDetails.lastName}`,
      customer_phone: userDetails.phoneNumber,
      customer_email: userDetails.email,
      booking_date: `${date.toISOString().slice(0, 10)} - ${time}`,
      booking_time: `${time}`,
      booking_comment: userDetails.comment,
      address: 'Locarno',
    }
    emailjs.init({
      publicKey: 'v6mw5OU5p-iH9HzQY',
      limitRate: {
        // Set the limit rate for the application
        id: 'app',
        // Allow 1 request per 10s
        throttle: 10000,
      },
    });
    await emailjs.send('service_l7z1zxa', 'template_gim4cnu', templateParams)
    await emailjs.send('service_l7z1zxa', 'template_58ch05h', templateParams)
  }
 
  return (
    <div className="user-details-wrapper container">
    <div className='appointment-user-details'>
      <div className="appointment-details">
        <button className='btn booking--btn top-margin' onClick={() => onBack()}>{lang.back}</button>
        <div className="appointment-details__date">{date.toDateString()}</div>
        <div className="appointment-details__time">{time}</div>
      </div>
      
      <div className="user-details">
        <p className="user-details__title">{lang.booking_user_details_title}</p>
        <div className="user-detail">
          <div className="user-detail__title">{lang.booking_user_details_lastname}</div>
          <input className={`${error.lastName ? 'error' : ''} cap`} type="text" placeholder={lang.booking_user_details_lastname} onChange={(e) => setUserDetails({...userDetails, lastName: e.target.value.toUpperCase()})}/>
          <p className={`user-detail__error ${error.lastName ? '' : 'hidden'}`}>{lang.booking_user_details_lastname_error}</p>
        </div>
        <div className="user-detail">
          <div className="user-detail__title">{lang.booking_user_details_firstname}</div>
          <input className={`${error.firstName ? 'error' : ''} cap`} type="text" placeholder={lang.booking_user_details_firstname} onChange={(e) => setUserDetails({...userDetails, firstName: e.target.value.toUpperCase()})}/>
          <p className={`user-detail__error ${error.firstName ? '' : 'hidden'}`}>{lang.booking_user_details_firstname_error}</p>
        </div>
        <div className="user-detail">
          <div className="user-detail__title">{lang.booking_user_details_phonenumber}</div>
          <input className={`${error.phoneNumber ? 'error' : ''}`} type="tel" placeholder={lang.booking_user_details_phonenumber} onChange={(e) => setUserDetails({...userDetails, phoneNumber: e.target.value})}/>
          <p className={`user-detail__error ${error.phoneNumber ? '' : 'hidden'}`}>{lang.booking_user_details_phonenumber_error}</p>
        </div>
        <div className="user-detail">
          <div className="user-detail__title">{lang.booking_user_details_email}</div>
          <input className={`${error.email ? 'error' : ''}`} type="email" placeholder={lang.booking_user_details_email} onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}/>
          <p className={`user-detail__error ${error.email ? '' : 'hidden'}`}>{lang.booking_user_details_email_error}</p>
        </div>
        <div className="user-detail">
          <div className="user-detail__title">{lang.booking_user_details_comment}</div>
          <input type="text"onChange={(e) => setUserDetails({...userDetails, comment: e.target.value})}/>
        </div>
        
        <button className='btn btn--secondary' onClick={handleBooking}>
          {isLoading ? <Spinner /> : (lang.booking_booking)}
        </button>
      </div>
    </div>
    </div>
  )
}

export default UserDetails
