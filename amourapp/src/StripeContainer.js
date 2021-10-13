import React from 'react'
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import PaymentForm from './PaymentForm'
require('dotenv').config()
const PUBLIC_KEY = 'pk_test_51JiCbaGOEavO6Qmn0YfNWZANNKIOb4wm6fje44sSv44IlENuA4q1zuqjDRBaXzs85FPcztpT6mBTekKo5DBeVKXM00REv4nOD4'
const stripeTestPromise = loadStripe(PUBLIC_KEY)
export default function StripeContainer(){
    return (
            <Elements stripe={stripeTestPromise}>
            <PaymentForm/>

            </Elements>
    )
}
