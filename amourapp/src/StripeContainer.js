import React from 'react'
import './env.js'
import{ Component } from 'react';
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import ReactDOM from 'react-dom';
import CheckoutForm from './CheckoutForm'

const PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY


    class App extends React.Component {




       
        render(){
            const {allData} = this.props
            
            const stripeTestPromise = loadStripe(PUBLIC_KEY,{
            stripeAccount: this.props.allData.stripeAccount})
            console.log(allData)
    return (
        
            <Elements stripe={stripeTestPromise}  >
            <CheckoutForm allData={this.props.allData}/>

            </Elements>
        
    )}
}
export default App