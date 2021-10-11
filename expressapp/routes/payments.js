var express = require('express');
var cors = require("cors")
var app = express();
app.use(cors());

require("dotenv").config()

var router = express.Router();
var db = require( "../database/db.js" );




const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST)

router.post('/secret', cors(), async (req, res) => {
  let {amount, id} = req.body
  try {
      const payment = await stripe.paymentIntents.create({
        amount,
        currency:"AUD",
        description: "test",
        payment_method: id,
        confirm: true,
      })
      console.log("payment", payment)
      res.json({
        message:"Payment Successful",
      success: true
    })
    }catch (error)
    {console.log("Error",error)}
    res.json({
      message:"Payment failed",
      success: false
    })
  });
  module.exports = router;