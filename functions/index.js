const express = require('express')
const functions = require('firebase-functions');
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const stripe = require('stripe')('sk_test_51HZ9LbEyuKjd388IZSZ9eM0Vwg8Hist0dCvSlukNNToPsUHmCOVhcVN3gWEIcZpTTpyEansyyQLdbUouQeycxN4200UYqIja9H');

const port = 3001

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors({origin: true}))

app.post('/checkout/basic', async (req, res) => {
  const {email, payment_method, plan_id} = req.body;

  const customer = await stripe.customers.create({
    payment_method: payment_method,
    email: email,
    invoice_settings: {
      default_payment_method: payment_method,
    },
  });

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ plan: plan_id }],
    expand: ['latest_invoice.payment_intent']
  });
  
  const status = subscription['latest_invoice']['payment_intent']['status'] 
  const client_secret = subscription['latest_invoice']['payment_intent']['client_secret']
  

  res.json({'client_secret': client_secret, 'status': status});
})

app.post('/checkout/pro', async (req, res) => {
  const {email, payment_method, plan_id} = req.body;

  const customer = await stripe.customers.create({
    payment_method: payment_method,
    email: email,
    invoice_settings: {
      default_payment_method: payment_method,
    },
  });

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ plan: plan_id }],
    expand: ['latest_invoice.payment_intent']
  });
  
  const status = subscription['latest_invoice']['payment_intent']['status'] 
  const client_secret = subscription['latest_invoice']['payment_intent']['client_secret']
  

  res.json({'client_secret': client_secret, 'status': status});
})


app.post('/checkout/memepage', async (req, res) => {
  const {email, payment_method, plan_id} = req.body;

  const customer = await stripe.customers.create({
    payment_method: payment_method,
    email: email,
    invoice_settings: {
      default_payment_method: payment_method,
    },
  });

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ plan: plan_id }],
    expand: ['latest_invoice.payment_intent']
  });
  
  const status = subscription['latest_invoice']['payment_intent']['status'] 
  const client_secret = subscription['latest_invoice']['payment_intent']['client_secret']
  

  res.json({'client_secret': client_secret, 'status': status});
})



app.post('/checkout/ultimate', async (req, res) => {
  const {email, payment_method, plan_id} = req.body;

  const customer = await stripe.customers.create({
    payment_method: payment_method,
    email: email,
    invoice_settings: {
      default_payment_method: payment_method,
    },
  });

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ plan: plan_id }],
    expand: ['latest_invoice.payment_intent']
  });
  
  const status = subscription['latest_invoice']['payment_intent']['status'] 
  const client_secret = subscription['latest_invoice']['payment_intent']['client_secret']
  

  res.json({'client_secret': client_secret, 'status': status});
})







app.listen(port, () => console.log(`Example app listening on port ${port}!`))

exports.application = functions.https.onRequest(app)