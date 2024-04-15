'use client'
import { cocoGothic } from "../styles/fonts"
import './page.css'
import Header from './components/header'
import About from './components/about/about'
import Nails from './components/nails/nails'
import Contact from './components/contact/contact'

export default function Home() {
  return (
    <div className={"home " + cocoGothic.className}>
      <Header />
      <About />
      <Nails />
      <Contact />
    </div>
  )
}
