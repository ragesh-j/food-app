import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminAddFood.css"
function AdminAddFood(){
    const[image,setImage]=useState("");
    const navigate=useNavigate()
    const [food, setFood] = useState({
        name: '',
        image: '',
        type: '',
        price: '',
        description: '',
        details: ''
    });
    const handleChange = (event) => {
        setFood({ ...food, [event.target.name]: event.target.value });
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        // Make a POST request to the backend with the car details

       food.image && fetch('http://localhost:8000/food/addfood',{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
                
            },
            body:JSON.stringify(food)
        })
            .then(response => {
                // Update the UI with the response from the backend
                console.log(response.data);
                setFood({
                    name: '',
                    image: '',
                    type: '',
                    price: '',
                    description: '',
                    details: ''
                });
                navigate("/food-home");
                
            })
            .catch(error => {
                // Update the UI with the error messages
                console.error(error.response.data);
            });
    };

    return <>
            <div className='header'>
                <h4>Add Food Details</h4>
            </div>
            <form >
                <div className="form-container">
                    <div className='firstPart'>
                        <div>
                            <span htmlFor="name" className='leftHeadings'> Food Name</span><br />
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={food.name}
                                placeholder="Name"
                                onChange={handleChange}
                                className="name"
                            />
                        </div>
                        <div className='leftHeaders'>
                            <div>
                                <span htmlFor="type" className='leftHeadings'>Type</span><br />
                                <select id="type" name="type" value={food.type} onChange={handleChange} className="optionsSelector">
                                    <option value=""></option>
                                    <option value="veg">Veg</option>
                                    <option value="non-veg">non-veg</option>
                                </select>
                            </div>
                        </div>
                        <div className='rightHeaders'>
                            <div >
                                <span htmlFor='rentPerHour' className='leftHeadings'>Price</span><br></br>
                                <input
                                    type="number"
                                    id='rentPerHour'
                                    name="price"
                                    value={food.price}
                                    placeholder="Rs"
                                    onChange={handleChange}
                                    className="optionsSelector"
                                />
                            </div>
                        </div>
                        <div className='description'>
                            <span htmlFor='description'>Description </span><br />
                            <textarea
                                type="text"
                                id='description'
                                name="description"
                                onChange={handleChange}
                                value={food.description}
                                rows="5" cols="50"
                                className='descriptionBlock'
                            />
                        </div>
                    </div>
                    <div className='secondPart'>
                        <div>
                            <span htmlFor='image' className='images'>Images</span><br />
                           
                            <input
                                type="file"
                                name="image"
                                id="image"
                                
                                placeholder="Enter image Url"
                                onChange={
                                    async(e)=>{
                                        e.preventDefault()
                                            const data=new FormData()
                                            data.append("file",e.target.files[0])
                                           data.append("upload_preset","xoogiv1f")
                                           data.append("cloud_name","dxhukfvxh")
                                           fetch("https://api.cloudinary.com/v1_1/dxhukfvxh/image/upload",{
                                                        method:"POST",
                                                        body:data
                                            }).then(response=>response.json()).then(data=>setFood(prev=>({...prev,image:data.url})))
                                          
                                }}
                                className="imageinput"
                                alt="carimages"
                            />
                        </div>
                        <div className='details'>
                            <span htmlFor='details'>Details</span><br />
                            <textarea
                                type="text"
                                id="details"
                                name="details"
                                value={food.details}
                                onChange={handleChange}
                                rows="5" cols="50"
                            />
                        </div>
                    </div>
                </div>
                <div className='buttons'>
                    <div>
                        <button className='cancelBtn' onClick={() => { navigate("/food-home") }}>Cancel</button>
                    </div>
                    <div>
                        <button className='addBtn' onClick={handleSubmit}>Add</button>
                    </div>
                </div>

            </form>



        </>
}
export default AdminAddFood;