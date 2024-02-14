import { useNavigate } from "react-router-dom"
import "./AdminSignIn.css"
import { useState } from "react"
function AdminSignIn(){
const navigate=useNavigate()
const [admin,setAdmin]=useState({
  contact:"",
  password:""
})  
const [passwordErr, setPasswordErr] = useState(false)
const [passwordErrMessage, setPasswordErrMessage] = useState('')
const handleSigninPassword = (e) => {
  setAdmin({...admin,password:e.target.value})
  setPasswordErrMessage('')
}



//styling when error in password
const passwordErrorStyle = {
  border: (passwordErr === true) ? "1px solid red" : "1px solid #D1D1D1"
}
    return (
        <div className='signinBody'>
          <div className='signinbody-left'>
            <h1>A RECIPE HAS NO SOUL WE BRING SOUL TO THE RECIPE</h1>
          </div>
          <div className='signinbody-right'>
            <div className='signin-form-Wrapper'>
              <div className='form-navbar'>
                <div className='form-navbar-toggles'><h3 style={{ color: '#4E94F4' }} onClick={() => {navigate("/admin-signin")}}>Admin</h3></div>
                <div className='form-navbar-toggles'><h3 onClick={() => {navigate('/user-signin')}}>User</h3></div>
              </div>
              <div className='signin-form'>
                <h3 className='form-header'>Sign in your Admin Account</h3>
                <div className='form-input-fields'>
                  <input type="email" placeholder='Contact' value={admin.contact} onChange={(e) => setAdmin({...admin,contact:e.target.value})} />
                  <input type="password" placeholder='Password' value={admin.password} onChange={handleSigninPassword} style={passwordErrorStyle} />
                  {passwordErr && (<span className='signin-passwordError' style={{ color: 'red' }}>{passwordErrMessage}</span>)}
                </div>
                <div className='form-footer'>
                  <button onClick={async(e)=>{
                    
                    e.preventDefault()
                    try{
                    const response=await fetch("http://localhost:8000/admin/login",{
                      method:'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(admin)

                    })
                    const data=await response.json()
                    alert(data.message)
                    if(response.ok){
                      navigate("/food-home")
                    }
                  }
                  catch(e){
                    console.error(e)
                    alert("login failed")
                  }
                  }
                  }>Sign In</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
}
export default AdminSignIn;