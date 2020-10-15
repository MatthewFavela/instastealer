import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import fire from '../../fire'
import { loadStripe } from '@stripe/stripe-js'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios'
import Shop from '../../pages/Shop'
import {Link} from 'react-router-dom'

const stripePromise = loadStripe('pk_test_51HZ9LbEyuKjd388INbEpvJJwGsRJsOP2TkTDtvMAgtzEJWTivdFDClRwrGKZWuyeY689cV5X26wxtLFFhhdyk2O200tMtrv9OP');
export function BasicCheckout() {


    const useStyles = makeStyles({
        root: {
            'background': 'none'
        },
        content: {
        },
        div: {
        },
        button: {
        },
    });
    const CARD_ELEMENT_OPTIONS = {
        style: {
            base: {
                'color': 'blue',
                'fontFamily': '"Helvetica Neue", Helvetica, sans-serif',
                'fontSmoothing': 'antialiased',
                'fontSize': '16px',
                'background': 'red',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a',
            },
        },
    }

    const [currentUser, setCurrentUser] = useState('')

    useEffect(() => {
        fire.auth().onAuthStateChanged((user) => {
            setCurrentUser(user)
            console.log('Current User', currentUser.uid)
        })
    })

    const uid = currentUser.uid
    const userEmail = currentUser.email

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmitBasic = async (event) => {
        if (!stripe || !elements) {
          // Stripe.js has not yet loaded.
          // Make sure to disable form submission until Stripe.js has loaded.
          return;
        }
    
        const result = await stripe.createPaymentMethod({
          type: 'card',
          card: elements.getElement(CardElement),
          billing_details: {
            email: currentUser.email,
          },
        });

        const plan_id = 'price_1HbainEyuKjd388IH9bObVUa'
    
        if (result.error) {
          console.log(result.error.message);
        } else {
          const res = await axios.post('http://localhost:3001/checkout/basic', {'payment_method': result.paymentMethod.id, 'email': currentUser.email, 'plan_id': plan_id});
          // eslint-disable-next-line camelcase
          const {client_secret, status} = res.data;
    
          if (status === 'requires_action') {
            stripe.confirmCardPayment(client_secret).then(function(result) {
              if (result.error) {
                console.log('There was an issue!');
                console.log(result.error);
                // Display error message in your UI.
                // The card was declined (i.e. insufficient funds, card has expired, etc)
              } else {
              }
            });
          } else {
            alert('Subscription added!')
            const db = fire.firestore().collection("subscriptions")

            db.get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc=>{
                const user = doc.data()
                if(user.email === userEmail){
                  console.log('user already exists')
                  db.doc(doc.id).delete()
                  .then(function(){
                    console.log(doc.id, 'has successfully been deleted')
                  })
                }else{
                  db.add({
                    email: userEmail,
                    subscription: 'basic'
                  })
                }
              })
            })
          }
        }
      };

    
      const classes = useStyles();
      console.log("rendered")

    
    return (
        <>
        <div className="dashboard">
            <div className="items">
            <div className="item">
                            <h1 className="cost-of-package">$5.00/mo</h1>
                            <h2 className="package-title">Basic Package</h2>
                            <h3>Steal from 5 accounts</h3>
                            <h3>Full Client Panel Access</h3>
                            <h3>24/7 Support</h3>
                            <h3>1 Month</h3>
                            <Card className={classes.root}>
                                <CardContent className={classes.content}>
                                    <CardElement options={CARD_ELEMENT_OPTIONS} />
                                    <div className={classes.div}>
                                    <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmitBasic}>
                                            Subscription</Button>
                                        
                                    </div>
                                </CardContent>
                            </Card>
    
                        </div>
            </div>

        </div>
        </>
    )
}

export default BasicCheckout