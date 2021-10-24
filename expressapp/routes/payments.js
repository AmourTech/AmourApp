var express = require('express');
var cors = require("cors")
var app = express();
app.use(cors());

require("dotenv").config()
var router = express.Router();
var db = require( "../database/db.js" );
const { ResourceValidationErrorsElement } = require('xero-node/dist/gen/model/assets/resourceValidationErrorsElement');



const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST)

router.get('/product',async(req,res)=>{
  try{
  var data = req.body
  var pay;
  var type;
  console.log(data.Dbill)
  console.log(data.Sname)
  if (data.End){
    pay=data.Cpay
    type="one";
  }else if(data.Begin){
    pay=data.Spay
    type="one";
  }else if(data.During){
    pay=data.Rpay
    type="time"
  }
    const product = await stripe.products.create({
      name: data.Sname,
      
    });
    console.log(data.Sname)
    const PRODUCT_ID= product.id
    if(type === "one"){

    const price = await stripe.prices.create({
      product: PRODUCT_ID,
      unit_amount: pay,
      currency: 'aud',
      
    })}
    else {
    const price = await stripe.prices.create({
      product: PRODUCT_ID,
      unit_amount:pay,
      currency: 'aud',
      recurring: {
        interval: 'month',
      },
    })
  }
    res.send(PRODUCT_ID)
  
}catch{console.log("there is an error"+req)}
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

router.get('/clientid',function(req,res) {
  try{
  db.query('Select StripeAcc FROM organisation WHERE OrganisationID = ?',[req.query.id], async (error, results) =>{
    var a = JSON.parse(JSON.stringify(results))[0].StripeAcc
    console.log(a)
    console.log(results.StripeAcc)
    res.send(a)

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
    refresh_url: 'https://localhost:3001/payments/touched',
    return_url: 'https://localhost:3000/Settings',
    type: 'account_onboarding',
    });
    res.send(accountLinks)
    res.end()
  } catch (error)
  {console.log("Error",error)}})
  }
 
)
router.post('/checktax',async (req, res) => {
 
});

router.post('/secret', cors(), async (req, res) => {
  
  let data= req.body

  let CONNECTED_STRIPE_ACCOUNT_ID = data.stripeAccount
var tax;
  try{
    const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST,{
      stripeAccount: CONNECTED_STRIPE_ACCOUNT_ID,
      })
  
        const taxRates = await stripe.taxRates.list({
          limit: 1,
        });
        console.log(taxRates)
        if(taxRates.data==''){
        const taxRate = await stripe.taxRates.create({
          display_name: 'GST',
          description: 'GST Australia',
          jurisdiction: 'AU',
          percentage: 10,
          inclusive: false,
        })
      tax=taxRate.id
      }else{

        tax=taxRates.data[0].id}
  
  
  
      }catch(error){console.log(error)}
// data.prices.map(item)=>{price:item,quantity:1,tax_rates:[process.env.GST]}
  try {

	let acolyte = data.cholder.map((first)=>{
    console.log(first)
		
		if(first.TaxRate ==='10'){
		return  {price:first.StripeID,quantity:1,tax_rates:[tax],}
		}else{
		return {price:first.StripeID,quantity:1,}
	
	
		}
		


})
console.log(acolyte)


const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: acolyte,
  payment_intent_data: {
    application_fee_amount: 0,
  },
  mode: 'payment',
  success_url: 'https://example.com/success',
  cancel_url: 'https://example.com/cancel',
}, {
  stripeAccount: CONNECTED_STRIPE_ACCOUNT_ID,
});


res.send(session.url)
  
    }catch (error)
    {console.log("Error",error)
    res.json({

      message:"Payment failed",
      success: false
    })}

  })






  module.exports = router;