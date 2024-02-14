import logo from './logo.svg';
import './App.css';
import UserLogin from './components/UserLogin';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import UserSignin from './components/UserSignin';
import AdminSignIn from './components/AdminSigIn';
import AdminFood from './components/AdminFood';
import AdminAddFood from './components/AdminAddFood';
import AdminEditFood from './components/AdminEditFood';
import UserHome from './components/UserHome';
import MyBooking from './components/MyBooking';

function App() {
  return <>
  <BrowserRouter>
  <Routes>
  <Route path="/" element={<UserLogin />}/>
  <Route path='/user-signin' element={<UserSignin />} />
  <Route path='/admin-signin' element={<AdminSignIn />} />
  <Route path='/food-home' element={<AdminFood />} />
  <Route path='/add-food' element={<AdminAddFood />} />
  <Route path='/edit-food' element={<AdminEditFood />} />
  <Route path='/user-food-details' element={<UserHome />} />
  <Route path='/mybooking' element={<MyBooking />} />
  </Routes>
  
  
  </BrowserRouter>
    
  </>
  
}

export default App;
