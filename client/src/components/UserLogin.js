import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './UserRegistration.css'

function UserLogin(){
const navigate=useNavigate();
 const [user,setUser]=useState({
    username:"",
    email:"",
    contact:"",
    password:"",
    confirmPassword:""
 })
  const [passwordErr, setPasswordErr] = useState(false)
  const [passwordErrMessage, setPasswordErrMessage] = useState('')

  const handlePassword = (e) => {
    setUser({...user,password:e.target.value})
    setPasswordErrMessage('')
  }

  const handleConfirmPassword = (e) => {
    setUser({...user,confirmPassword:e.target.value})
    setPasswordErrMessage('')
  }

  const passwordErrorStyle = {
    border: (user.password !== user.confirmPassword) ? "1px solid red" : "1px solid #D1D1D1"
  }

    return<>
     <div className='registrationBody'>
        <div className='registrationbody-left'>
          <h1 > A RECIPE HAS NO SOUL WE BRING SOUL TO THE RECIPE </h1>
        </div>
        <div className='registrationbody-right'>

          <div className='registration-form-Wrapper'>
            <div className='form-navbar'>
              <div className='form-navbar-toggles'><h3 style={{ color: '#4E94F4' }} onClick={() => {navigate("/") }}>User</h3></div>
              <div className='form-navbar-toggles'><h3  onClick={() => {navigate("/admin-signin")}}>Admin</h3></div>
            </div>
            <div className='registration-form'>
              <h3 className='form-header'>Create new User account</h3>
              <div className='form-input-fields'>
                <input type='text' placeholder='Name' value={user.name} onChange={(e) => setUser({...user,username:e.target.value})} />
                <input type='email' placeholder='Email' value={user.email} onChange={(e) => setUser({...user,email:e.target.value})} />
                <input type='text' placeholder='Contact' value={user.contact} onChange={(e) => setUser({...user,contact:e.target.value})} />
                <input type='password' placeholder='Password' value={user.password} onChange={handlePassword} style={passwordErrorStyle} />
                <input type='password' placeholder='Confirm Password' value={user.confirmPassword} onChange={handleConfirmPassword} style={passwordErrorStyle} />
                {passwordErr && (<span className='register-passwordError' style={{ color: 'red' }}>{passwordErrMessage}</span>)}
              </div>
              <div className='form-footer'>
              <p className='signin' onClick={() => { navigate('/user-Signin') }}>Sign In</p>
                <button onClick={async (e)=>{
                  e.preventDefault()
                  if (user.username === "" || user.email === "" || user.contact === "" || user.password === "" || user.confirmPassword === "") {
                    alert('Empty form fields not allowed')
                  }else if(user.password===user.confirmPassword){
                  try{
                    const response=await fetch("http://localhost:8000/user/register",{
                      method:'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(user)

                    })
                    const data=await response.json()
                    alert(data.message)
                    if(response.ok){
                      navigate("/user-signin")
                    }
                  }
                  catch(e){
                    console.error(e)
                    alert("Try after sometimes")
                  }}
                }} >Register</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
}
export default UserLogin