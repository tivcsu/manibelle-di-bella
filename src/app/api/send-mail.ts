"use client"

import emailjs from '@emailjs/browser';

export async function sendMail() {

  const sendEmail = () => {
    const templateParams = {
      customer_name: `${userDetails.lastName} ${userDetails.firstName}`,
      customer_phone: userDetails.phoneNumber,
      customer_email: userDetails.email,
      booking_date: `${date.toISOString().slice(0, 10)} - ${time}`,
      booking_appointment: appointment.title,
      booking_comment: userDetails.comment
    }
    emailjs.send('booking_email_gmail', 'new_booking', templateParams, 'ps1Ab9mdYE4eeMwip')
  }

  /*const params = {
    "from": {
      "email": "manibelledibella@gmail.com",
      "name": "Manibelle di Bella"
    },
    "to": [
      {
        "email": "vadarti@gmail.com",
        "name": "Tivi"
      }
    ],
    "subject": "Hello from {$company}!",
    "text": "This is just a friendly hello from your friends at {$company}.",
    "html": "<b>This is just a friendly hello from your friends at {$company}.</b>"
  }

  await fetch("https://api.mailersend.com/v1/email", {
    headers: {
      'Authorization': 'Bearer mlsn.15a3dbbf2fe4fb60a8453f75e2fde2a0c37302ca89013b6488a6ba8bf7eb786f',
      'Access-Control-Allow-Origin':  'https://api.mailersend.com',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Authorization',
    },
    method: 'POST',
    body: JSON.stringify(params),
  })*/
}
