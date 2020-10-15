import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import fire from '../fire'
import { loadStripe } from '@stripe/stripe-js'
import { useStripe, useElements } from '@stripe/react-stripe-js';
import {makeStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom'


toast.configure()

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


const stripePromise = loadStripe('pk_test_51HZ9LbEyuKjd388INbEpvJJwGsRJsOP2TkTDtvMAgtzEJWTivdFDClRwrGKZWuyeY689cV5X26wxtLFFhhdyk2O200tMtrv9OP');
const Shop = () => {

    const [currentUser, setCurrentUser] = useState('')

    useEffect(() => {
        fire.auth().onAuthStateChanged((user) => {
            setCurrentUser(user)
            console.log('Current User', currentUser.uid)
        })
    })

    const uid = currentUser.uid

    const stripe = useStripe();
    const elements = useElements();

    const classes = useStyles();

    return (
        <>

            <div>

                <div className="dashboard">
                    <div className="items">
                    <div className="item">
                            <h1 className="cost-of-package">$5.00/mo</h1>
                            <h2 className="package-title">Basic Package</h2>
                            <h3>Steal from 5 accounts</h3>
                            <h3>Full Client Panel Access</h3>
                            <h3>24/7 Support</h3>
                            <h3>1 Month</h3>
                            <Link to="/basic-checkout">Checkout</Link>
    
                        </div>
                        <div className="item">
                            <h1 className="cost-of-package">$10.00/mo</h1>
                            <h2 className="package-title">Pro Package</h2>
                            <h3>Steal from 10 accounts</h3>
                            <h3>Full Client Panel Access</h3>
                            <h3>24/7 Support</h3>
                            <h3>1 Month</h3>
                            <Link to="/pro-checkout">Checkout</Link>
                        </div>
                        <div className="item">
                            <h1 className="cost-of-package">$20.00/mo</h1>
                            <h2 className="package-title">Memepage Package</h2>
                            <h3>Steal from 100 accounts</h3>
                            <h3>Full Client Panel Access</h3>
                            <h3>24/7 Support</h3>
                            <h3>1 Month</h3>
                            <Link to="/memepage-checkout">Checkout</Link>
                        </div>
                        <div className="item">
                            <h1 className="cost-of-package">$30.00/mo</h1>
                            <h2 className="package-title">Ultimate Package</h2>
                            <h3>Steal from UNLIMITED accounts</h3>
                            <h3>Full Client Panel Access</h3>
                            <h3>24/7 Support</h3>
                            <h3>1 Month</h3>
                            <Link to="/ultimate-checkout">Checkout</Link>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Shop