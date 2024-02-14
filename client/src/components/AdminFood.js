import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./AdminFood.css"
import {FoodContext} from "./FoodProvider"
import { useContext } from "react"
function AdminFood(){
    const {handle,selectedFood,setSelectedFood}=useContext(FoodContext)
    const navigate=useNavigate()
    const [foods,setFood]=useState([])
useEffect(() => {
fetchData()
            
}, [handle]);
const fetchData=()=>{
    fetch('http://localhost:8000/food/getallfoods')
    .then(response => response.json())
    .then(data => {setFood(data)})
}
const handleDelete = (value) => {
    fetch(`http://localhost:8000/food/deletefood`,{
        method:"DELETE",
        headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify({id:value})

    })
        .then((response) => {
            fetchData()
            console.log(response);

        }).then(console.log("car deleted successfully"))
        .catch((error) => {
            // handle error, such as showing an error message to the user
            console.error(error.response.data);
        });
        
}
    return (
        <>
            <div className='adminHeading'>
                <h3 >Hello Admin...</h3>
            </div>
            <br />
            <div className='headerSection2'>
                <div className='carHeading'>Foods</div>
                <button className='addButton' onClick={() => {navigate("/add-food") }}>Add</button>
            </div>
            <div id="car-detail-div">
        {foods.map(data=>{
        return <div id="data-div" key={data._id}>
                <div id="img-div">
                    <img src={data.image}/>
                </div>
                <div id="details-div">
                    <div>{data.name}</div>
                    <div>{`${data.price} Rs`}</div>
                </div>
                <div id="button-div"><button onClick={()=>{
                    setSelectedFood({
                        id:data._id,
                        name: data.name,
                        type: data.type,
                        price: data.price,
                        details:data.details,
                        image:data.image,
                        description: data.description
                    })
                    navigate("/edit-food")
                }}>Edit</button>
                    <button onClick={()=>{handleDelete(data._id)}}>Delete</button>
                </div>
                
        </div>
    })}
    </div>

        </>
    )}

export default AdminFood