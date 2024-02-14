import { useContext } from "react"
import {FoodContext} from "./FoodProvider"
import { useNavigate } from "react-router-dom";
function AdminEditFood(){
    const{setHandle,selectedFood,setSelectedFood}=useContext(FoodContext)
    const navigate=useNavigate()
    const handleChange = (event) => {
        setSelectedFood({ ...selectedFood, [event.target.name]: event.target.value });
    };
    const handleSaveClick = () => {
        
        fetch(`http://localhost:8000/food/editfood`,{
            method:"PUT",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify(selectedFood)

        })
        .then((response) => {
            // handle successful save, such as showing a success message to the user
            setHandle(prev=>!prev)
            console.log('Car added successfully');
        })
        .catch((error) => {
            // handle error, such as showing an error message to the user
            console.error(error.response.data);
            
        });
        navigate("/food-home");
};


    return <>
      <div className='header'>
                <h4>Edit Food Details</h4>
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
                                value={selectedFood.name}
                                placeholder="Name"
                                onChange={handleChange}
                                className="name"
                            />
                        </div>
                        <div className='leftHeaders'>
                            <div>
                                <span htmlFor="type" className='leftHeadings'>Type</span><br />
                                <select id="type" name="type" value={selectedFood.type} onChange={handleChange} className="optionsSelector">
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
                                    value={selectedFood.price}
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
                                value={selectedFood.description}
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
                                            }).then(response=>response.json()).then(data=>setSelectedFood(prev=>({...prev,image:data.url})))
                                          
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
                                value={selectedFood.details}
                                onChange={handleChange}
                                rows="5" cols="50"
                            />
                        </div>
                    </div>
                </div>
                <div className='buttons'>
                    <div>
                        <button className='cancelBtn' onClick={() => { 
                            setSelectedFood({
                                id:"",
                                name: "",
                                type: "",
                                price: "",
                                details:"",
                                description: ""
                            })
                            navigate("/food-home") }}>Cancel</button>
                    </div>
                    <div>
                        <button className='addBtn' onClick={handleSaveClick}>Save</button>
                    </div>
                </div>

            </form>


    </>
}
export default AdminEditFood;