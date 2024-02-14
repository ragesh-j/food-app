import { useEffect, useState } from "react"
import "./MyBooking.css"
function MyBooking(){
    const [edit,setEdit]=useState(false)
    const [bookingData,setBookingData]=useState([])
    const[canceltrigger,setcanceltrigger]=useState(true)
    const fetchData=()=>{
        fetch("http://localhost:8000/booking/getallbookings")
        .then(res=>res.json()).then(data=>{setBookingData(data)}).catch(err=>console.log(err))
    }
    useEffect(()=>{
        fetchData()
    },[canceltrigger])
    
    return<>
        {bookingData.map((item)=>{
        return <div id="my-booking-main-div" key={item._id}>
        <div id="img-div"><img src={item.image}/></div>
        <div id="car-details-div">
            <h2>{item.name}</h2>
            <div id="car-spec">
                <div>Type :<span id="car-type">{item.type}</span></div>
                <div>Details :<span id="car-seat">{item.details} </span></div>
                <div>Description :<span id="car-mileage">{item.description}</span></div>
                <div>Price :<span id="car-rsperkm">{item.price}Rs</span></div>
            </div>
        </div>

        <div id="button-div">
            <button id="cancel-button" onClick={()=>{
                        fetch("http://localhost:8000/booking/deletebooking",{
                        method:"DELETE",    
                        headers: {
                                "Content-Type": "application/json",
                              },
                        body:JSON.stringify({
                            id:item._id
                        })
                        }).then(response=>response.json()).then(data=>setcanceltrigger(prev=>!prev)).catch(err=>console.log(err))
            }}>Cancel</button>
        </div>
    </div>})
    
}

</>
}

export default MyBooking;