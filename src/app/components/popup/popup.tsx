'use client'
import './popup.css'

interface IProps {
  text: string
  onConfirm: () => void
}

const Popup = ({text, onConfirm}: IProps) => {
  const handleClick = () => {
    onConfirm()
  }
  return (
    <div className='popup'>
      <p className='popup__text'>{text}</p>
      <button className='btn' onClick={handleClick}>{'Confirm'}</button>
    </div>
  )
}

export default Popup
