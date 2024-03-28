import React, { useState } from 'react'
import './Login.css'
import bg from '../images/login.png'
import axios from 'axios'

const Login = () => {
    const [isLoginn,setIsLogin]=useState(true)
    const [fname,setFname]=useState("")
    const [lname,setLname]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [error,setError]=useState()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            if(isLoginn){//for login
                const url="http://localhost:7000/api/auth"
                await axios.post(url,{email:email,password:password})
                .then(res=>{
                    localStorage.setItem("token",res.data.data)
                    console.log(res.data)
                    localStorage.setItem("user",res.data.user)
                    window.location="/"
                })
            }
            else{//for register
                const url="http://localhost:7000/api/users"
                const {data}=await axios.post(url,{firstName:fname,lastName:lname,email:email,password:password})
                console.log(data)
            }
            
        } catch (error) {
            if(
                error.response && error.response.status>=400 && error.response.status<=500
            ){
                setError(error.response.data.message)
            }
        }
    }
  return (
    <div className='login-page-main-container'>
      <div style={{paddingTop:(isLoginn)?"15%":"10px"}} className='login-left'>
        <label className='login-header'>{(isLoginn)?"Login":"Signup"}</label>
        <label className='wel-back'>{(isLoginn)?"Welcome back":"Hey! lets start our journey"}</label>
        <form className='login-form'>
            {
              (!isLoginn)?  <>
            <div className='one'>
                <label>Firstname</label>
                <input type='text' onChange={e=>setFname(e.target.value)} placeholder='Enter your firstname'/>
            </div>
            <div className='two'>
                <label>Lastname</label>
                <input type='text' onChange={e=>setLname(e.target.value)} placeholder='Enter your lastname'/>
            </div>
            </>:null}
            <div className='one'>
                <label>E-mail</label>
                <input type='email' onChange={e=>setEmail(e.target.value)} placeholder='Enter your email'/>
            </div>
            <div className='two'>
                <label>Password</label>
                <input type='password' onChange={e=>setPassword(e.target.value)} placeholder='Enter your password'/>
            </div>
            {
                (error)?<div className='errormsg'><label style={{fontSize:"12px",marginLeft:"10px"}}>{error}</label></div>:null
            }
            <label className='fg three'>Forgot password?</label>
            <button onClick={handleSubmit} type='submit' id='four' className='login-submit-btn'>{(isLoginn)?"Login":"Register"}</button>
            <div className='or five'>
                <label>OR</label>
            </div>
            <div style={{flexDirection:"row",justifyContent:"space-between"}} className='social-media-holders'>
                <div className='six'>
                    <i class="fa-brands fa-github"></i>
                    {/* <label>github</label> */}
                </div>
                <div className='seven'>
                    <i class="fa-brands fa-linkedin"></i>
                    {/* <label>Google</label> */}
                </div>
                <div className='eight'>
                    <i class="fa-brands fa-instagram"></i>
                    {/* <label>Google</label> */}
                </div>
            </div>
        </form>
        
        <div className='register-holder nine'>
            <label>{(isLoginn)?"Don't have an account?":"already have an account"}</label>
            <label className='signup' onClick={()=>{
                setIsLogin(!isLoginn)
                setError(null)
                }}>{(isLoginn)?"Sign up":"Login"}</label>
        </div>
      </div>
      <div className='login-right'>
        <img src={bg} alt='image has not loaded'/>
      </div>
    </div>
  )
}

export default Login
