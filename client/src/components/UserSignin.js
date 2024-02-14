import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./UserSignIn.css"
function UserSignin(){

    const navigate=useNavigate()
    const [userSignin,setUserSignin]=useState({
        contact:"",
        password:""

    })
    const [passwordErr, setPasswordErr] = useState(false)
    const [passwordErrMessage, setPasswordErrMessage] = useState('')
    const passwordErrorStyle = {
        border: (passwordErr === true) ? "1px solid red" : "1px solid #D1D1D1"
      }
    //handle Password function
    const handleSigninPassword = (e) => {
      setUserSignin({...userSignin,password:e.target.value})
      setPasswordErrMessage('')
    }
    return (
        <div className='signinBody'>
          <div className='signinbody-left'>
            <h1>A RECIPE HAS NO SOUL WE BRING SOUL TO THE RECIPE</h1>
          </div>
          <div className='signinbody-right'>
            <div className='signin-form-Wrapper'>
              <div className='form-navbar'>
                <div className='form-navbar-toggles'><h3 onClick={() => { navigate('/admin-signin') }}>Admin</h3></div>
                <div className='form-navbar-toggles'><h3 style={{ color: '#4E94F4' }} onClick={() => { navigate('/user-signin') }}>User</h3></div>
              </div>
              <div className='signin-form'>
                <h3 className='form-header'>Sign in your Account</h3>
                <div className='form-input-fields'>
                  <input type="email" placeholder='Contact' value={userSignin.contact} onChange={(e) => setUserSignin({...userSignin,contact:e.target.value})} />
                  <input type="password" placeholder='Password' value={userSignin.password} onChange={handleSigninPassword} style={passwordErrorStyle} />
                  {passwordErr && (<span className='signin-passwordError' style={{ color: 'red' }}>{passwordErrMessage}</span>)}
                </div>
                <div className='form-footer'>
                  <p className='signin' onClick={() => { navigate('/') }}>Create new account</p>
                  <button onClick={async(e)=>{
                    e.preventDefault()
                    try{
                    const response=await fetch("http://localhost:8000/user/login",{
                      method:'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(userSignin)

                    })
                    const data=await response.json()
                    alert(data.message)
                    if(response.ok){
                      navigate("/user-food-details")
                    }
                  }
                  catch(e){
                    console.error(e)
                    alert("login failed")
                  }
                  }}>Sign In</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
}
export default UserSignin;