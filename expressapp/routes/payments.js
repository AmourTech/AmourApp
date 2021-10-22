var express = require('express');
var cors = require("cors")
var app = express();
app.use(cors());

require("dotenv").config()
var router = express.Router();
var db = require( "../database/db.js" );
const { ResourceValidationErrorsElement } = require('xero-node/dist/gen/model/assets/resourceValidationErrorsElement');



const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST)






router.get('/productMixed',async(req,res)=>{
const apple = req.body
  const productr = await stripe.products.create({
    name: apple.Sname,
  });
const PRODUCTR_ID= productr.id
  const pricer = await stripe.prices.create({
    product: PRODUCTR_ID,
    unit_amount: req.body.Rpay,
    currency: 'aud',
    recurring: {
      interval: 'month',
    },
  });
  const productc = await stripe.products.create({
    name: apple.Sname,
  });
const PRODUCTC_ID= productc.id
  const pricec = await stripe.prices.create({
    product: PRODUCTC_ID,
    unit_amount: req.body.Cpay,
    currency: 'aud',
  });
  const products = await stripe.products.create({
    name: apple.Sname,
  });
const PRODUCTS_ID= products.id
  const pricec = await stripe.prices.create({
    product: PRODUCTS_ID,
    unit_amount: req.body.Spay,
    currency: 'aud',
  });

{}

})


// router.get('/touchedChecked',function(req,res) {
//   try{
//   db.query('Select StripeAcc FROM organisation WHERE OrganisationID = ?',[req.query.id], async (error, results) =>{
//     var a = JSON.parse(JSON.stringify(results))[0].StripeAcc
//     console.log(a)


//     const check = await stripe.accounts.retrieve(
//       a
//       );
//       console.log(check.details_submitted)
//       res.send(check)

//     })
//   }  catch(error){console.log("Error",error)}






// })


router.get('/touchedChecked',function(req,res) {
  try{
  db.query('Select StripeAcc FROM organisation WHERE OrganisationID = ?',[req.query.id], async (error, results) =>{
    var a = JSON.parse(JSON.stringify(results))[0].StripeAcc
    console.log(a)


    const check = await stripe.accounts.retrieve(
      a
      );
      console.log(check.details_submitted)
      res.send(check)

    })
  }  catch(error){console.log("Error",error)}






})


router.get('/touched',function(req,res){


    db.query('Select StripeAcc FROM organisation WHERE OrganisationID = ?',[req.query.id], async (error, results, fields)=> {
      try {
      //console.log('The solution is: ');
      var a = JSON.parse(JSON.stringify(results))[0].StripeAccy
        console.log(a)


    const accountLinks = await stripe.accountLinks.create({
    account: a,
    refresh_url: 'http://localhost:3001/payments/touched',
    return_url: 'http://localhost:3000/Settings',
    type: 'account_onboarding',
    });
    res.send(accountLinks)
    res.end()
  } catch (error)
  {console.log("Error",error)}})
  }
 
)


router.post('/secret', cors(), async (req, res) => {
  let data= req.body
  try {
      const paymentS = await stripe.paymentIntents.create({
        amount: req.body.Spay,
        currency:"AUD",
        description: "test",
        payment_method: ['card'],
        confirm: true,
      },
      )
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