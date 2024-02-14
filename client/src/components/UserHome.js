import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserHome(){
    const navigate=useNavigate()
    const [foods,setFood]=useState([])
    const [show,setShow]=useState({
        name:"",
        type:"",
        image:"",
        description:"",
        price:"",
        details:""
    })
    useEffect(() => {
        fetch('http://localhost:8000/food/getallfoods')
        .then(response => response.json())
        .then(data => {setFood(data)})
                
    }, []);
  
    return <>
    <div className='headerSection2'>
        <div className='carHeading'>Foods</div>
        <button className='addButton' onClick={() => {navigate("/mybooking") }}>My bookings</button>
    </div>
    <div id="car-detail-div">
{foods.map(data=>{

return (<div id="data-div" key={data._id} >
        <div id="img-div"style={{textAlign:"center"}}>
            <img src={data.image} alt="imgage" />
        </div>
        <div id="details-div">
            <div>{data.name}</div>
            <div>{`${data.price} Rs`}</div>
        </div>
        <div style={{paddingBottom:'1rem'}}>
            <li>{data.type}</li>
            <li>{data.details}</li>
            <li>{data.description}</li>
        </div>
       
        <div id="button-div">
            <button onClick={()=>{
              
                fetch("http://localhost:8000/booking/addbooking",{
                    method:"POST",
                    headers:{
                        "Content-Type": "application/json",
                    },
                    body:JSON.stringify({
                    name:data.name,
                    type:data.type,
                    image:data.image,
                    description:data.description,
                    price:data.price,
                    details:data.details
                    })
                }).then(res=>{console.log("hi")
                    navigate("/mybooking")}).catch(err=>console.log(err))
                
            }}>Buy Now</button>
        </div>
        
</div>)
})}
</div>
</>
}
export default UserHome