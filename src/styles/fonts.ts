import { Cormorant_Garamond } from "next/font/google"
import localFont from 'next/font/local'

export const cormorantGaramond = Cormorant_Garamond({
  subsets:['cyrillic'],
  weight: '300'
})
export const cocoGothic = localFont({ 
  src: [
    {
      path: '../styles/CocoGothic-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../styles/CocoGothic.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../styles/CocoGothic-Bold.ttf',
      weight: '600',
      style: 'normal',
    },
  ],
})
