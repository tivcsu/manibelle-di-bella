'use client'
import { LangContext } from '@/app/layout';
import { useContext, useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

export interface IAppointment {
  id: number
  title: string
  duration?: string
  description?: string
}
type ValuePiece = Date | null;
export type Value = ValuePiece;

interface IProps {
  appointment?: IAppointment
  bookings: string[]
  onSelectTime: (date: Value, time: string) => void
}

const DateSelector = ({appointment, bookings, onSelectTime}: IProps) => {
  const lang = useContext(LangContext)

  const [selectedDate, setSelectedDate] = useState<Value>(getNextAvailableDate())
  const [selectedTime, setSelectedTime] = useState<null | string>(null)
  const [availableTimes, setAvailableTimes] = useState<Date[]>([])
  const [isNextAvailable, setIsNextAvailable] = useState<boolean>(false)

  useEffect(() => {
    setSelectedTime(null)
    initTimes()
  }, [selectedDate])

  useEffect(() => {
    if (selectedDate && selectedTime) {
      setIsNextAvailable(true)
    } else {
      setIsNextAvailable(false)
    }
  }, [selectedTime])

  const handleNextClick = () => {
    onSelectTime(selectedDate, (selectedTime ?? ''))
  }

  const initTimes = () => {
    const times: Date[] = []
    for (let i = 0; i < 10; i++) {
      times.push(new Date(selectedDate ?? ''))
    }
    const firstTime = getNextAvailableDate()
    firstTime.setHours(9)
    firstTime.setMinutes(0)
    const allTimes = times.reduce((times, currTime, index) => {
      if (index > 0) {                
        currTime.setHours(times[index - 1].getHours() + 1)
        currTime.setMinutes(0)
        return [...times, currTime]
      } else {
        return [...times, firstTime]
      }
    }, [] as Date[])
    const selectableTimes = allTimes.filter(time => !bookings.some(booking => booking === `${selectedDate?.toISOString().slice(0, 10)}T${time.toLocaleTimeString().slice(0, 5)}`))
    
    setAvailableTimes(selectableTimes)
  }

  const handleTimeSelect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {    
    setSelectedTime((e.target as HTMLDivElement).textContent)
  }
  const onSelectDate = (value: any) => {
    setSelectedDate(value)
  }

  return (
    <div className='appointment-time-selector container'>
      {appointment && <div className="appointment-details">
        <div className="title">{appointment.title}</div>
        <div className="duration">{appointment.duration}</div>
        <div className="description">{appointment.description}</div>
      </div>}
      <div className="dates">
        <div className="date-selector">
        <Calendar
          className='calendar'
          tileClassName='calendar'
          value={selectedDate}
          onChange={onSelectDate}
          tileDisabled={({ activeStartDate, date, view }) => disableWeekends(date)}
          locale={lang.selectedLang === 'IT' ? 'it-IT' : 'en-EN'}
          minDate={new Date()
        }/>
        </div>
        <div className="available-dates" id='available-dates'>
          <div className="selected-date">
            <p>{ selectedDate!.toDateString()}</p>
          </div>
          <div className="available-dates__list">
            {availableTimes.map(time => (
              <div
                key={formatTime(time)}
                className={`time ${formatTime(time) === selectedTime ? 'selected' : ''}`}
                onClick={handleTimeSelect}>
                  {formatTime(time)}
              </div>
            ))}
          </div>
            </div>
        </div>
        <button
          className={`btn booking--btn ${isNextAvailable ? '' : ' hidden'}`}
          onClick={handleNextClick}
        >
          {lang.next}
        </button>  
    </div>
  )
}

const formatTime = (time: Date) => {
  return `${time.getHours() < 10 ?
    `0${time.getHours()}` :
    time.getHours()}:${time.getMinutes() < 10  ? `0${time.getMinutes()}` : time.getMinutes()}`
}
const disableWeekends = (date: Date) => {
  return new Date(date).getDay() === 0 || new Date(date).getDay() === 6;
}

const getNextAvailableDate = () => {
  const today = new Date()
  if (today.getDay() === 5) { //Péntek
    const date = today.getDate()
    today.setDate(date + 3)
    return today
  }
  if (today.getDay() === 6) { //Szombat
    const date = today.getDate()
    today.setDate(date + 2)
    return today
  }
  if (today.getDay() === 0) { //Vasárnap
    const date = today.getDate()
    today.setDate(date + 1)
    return today
  }
  const date = today.getDate()
  today.setDate(date + 1)
  return today
}

export default DateSelector
