import React from 'react'
import { useRef } from 'react'
import './login.css'
import { loginCall } from '../../apiCalls'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import {CircularProgress} from '@mui/material'

export default function Login() {
    const email = useRef()
    const password = useRef()
    const {user, isFetching, dispatch} = useContext(AuthContext)

    const handleClick = (e)=>{
        e.preventDefault()
        loginCall({email:email.current.value, password:password.current.value}, dispatch)
        console.log(isFetching)
    }
    console.log(user)
    
  return (
    <div className='login'>
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">JithBook</h3>
                <span className="loginDesc">Connect with friends on JithBook</span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input placeholder='Email' type="email" required className="loginInput" ref={email}/>
                    <input placeholder='Password' type="password" 
                    required className="loginInput" ref={password}
                    minLength="6"/>
                    <button className="loginButton" type='submit' disabled={isFetching} >
                        {isFetching ? <CircularProgress color="secondary" /> :"Log In"}</button>
                    <span className='loginForgot'>Forgot Password?</span>
                    <button className='loginRegisterButton'>Create a new account</button>
                </form>
            </div>
        </div>

    </div>
  )
}
