import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import fire from './fire'
import Login from './components/Login'
import Hero from './components/Hero'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js'

import './App.css';

const stripePromise = loadStripe('pk_test_51HZ9LbEyuKjd388INbEpvJJwGsRJsOP2TkTDtvMAgtzEJWTivdFDClRwrGKZWuyeY689cV5X26wxtLFFhhdyk2O200tMtrv9OP')

function App() {

  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [hasAccount, setHasAccount] = useState(false)

  const clearInputs = () => {
    setEmail('')
    setPassword('')
  }

  const clearErrors = () => {
    setEmailError('')
    setPasswordError('')
  }

  const handleLogin = () => {
    clearErrors()
    fire
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(err => {
      switch(err.code){
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
        setEmailError(err.message)
        break;
        case "auth/wrong-password":
        setPasswordError(err.message)
        break;
      }
    })
  }


  const handleSignup = () => {
    clearErrors()
    fire
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(err => {
      switch(err.code){
        case "auth/email-already-in-use":
        case "auth/invalid-email":
        setEmailError(err.message)
        break;
        case "auth/weak-password":
        setPasswordError(err.message)
        break;
      }
    })
  }

  const handleLogout = () => {
    fire.auth().signOut();
  }
  
  const authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if(user){
        clearInputs()
        setUser(user)
      } else {
        setUser('')
      }
    })
  }


  useEffect(()=>{
    authListener()
  },[])


  return (
    <Router>
      <div>

{user ? (

  //If User Is Logged In
  <Elements stripe={stripePromise}>
    <Hero handleLogout={handleLogout} />
  </Elements>


) : (

  //If User Is Not Logged In
<Login email={email} setEmail={setEmail} password={password} setPassword={setPassword} handleLogin={handleLogin} handleSignup={handleSignup} hasAccount={hasAccount} setHasAccount={setHasAccount} emailError={emailError} passwordError={passwordError} />


)}

</div>
    </Router>
    
  );
}

export default App;
