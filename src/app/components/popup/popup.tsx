'use client'
import { useContext } from 'react'
import './popup.css'
import { LangContext } from '@/app/layout'

interface IProps {
  text: string
  onConfirm: () => void
}

const Popup = ({text, onConfirm}: IProps) => {
  const lang = useContext(LangContext)

  const handleClick = () => {
    onConfirm()
  }
  return (
    <div className='popup'>
      <p className='popup__text'>{text}</p>
      <button className='btn' onClick={handleClick}>{lang.confirm}</button>
    </div>
  )
}

export default Popup
