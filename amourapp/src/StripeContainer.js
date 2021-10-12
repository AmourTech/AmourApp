import React from 'react'
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import PaymentForm from './PaymentForm'
require('dotenv').config()
export default function StripeContainer(){
    return (
            <Elements stripe={loadStripe(process.env.PUBLIC_KEY)}>
            <PaymentForm/>

            </Elements>
    )
}
