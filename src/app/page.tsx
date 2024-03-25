'use client'
import Image from 'next/image'
import { cocoGothic } from "../styles/fonts"
import './page.css'
import Header from './components/header'
import About from './components/about/about'
import Nails from './components/nails/nails'
import Booking from './components/booking/booking'

export default function Home() {
  return (
    <div className={"home " + cocoGothic.className}>
      <Header />
      <About />
      <Nails />
      <Booking />
    </div>
  )
}
