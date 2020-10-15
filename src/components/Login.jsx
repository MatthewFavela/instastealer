import React, {useState, useEffect} from 'react'

export function Login(props) {
    const {email, setEmail, password, setPassword, handleLogin, handleSignup, hasAccount, setHasAccount, emailError, passwordError} = props

    



    return (
        <div>
            <div className="loginContainer">
            {hasAccount ? (
                        <>
                        <h1 className="login-screen-title">Login</h1>
                        </>
                    ) : (
                        <>
                        <h1 className="login-screen-title">Sign Up</h1>
                        </>
                    )}

                <h4 htmlFor="">Username</h4>
                <input type="text" className="input-container" autoFocus required value={email} onChange={e => {setEmail(e.target.value)}}/>
                <p className="errorMsg">{emailError}</p>
                <h4 htmlFor="">Password</h4>
                <input type="password" className="input-container" required value={password} onChange={e => {setPassword(e.target.value)}}/>
                <p className="errorMsg">{passwordError}</p>
                <div className="btnContainer">
                    {hasAccount ? (
                        <>
                        <button onClick={handleLogin} className="login-action-button">Sign In</button>
                        <p>Don't have an account?<span onClick={()=>{setHasAccount(!hasAccount)}}> Sign Up</span></p>
                        </>
                    ) : (
                        <>
                        <button onClick={handleSignup} className="login-action-button">Sign Up</button>
                        <p>Have an account? <span onClick={()=>{setHasAccount(!hasAccount)}}>Sign In</span></p>
                        </>
                    )}
                </div>

            </div>
        </div>
    )
}

export default Login