import { createContext, useState } from "react";

const FoodContext = createContext()
function FoodProvider({ children }) {
    const[handle,setHandle]=useState(true)
    const [foodBooking, setFoodBooking] = useState({
            foodType: "",
            foodName: "",
            description:"",
            image:"",
            price:""
        })
    const [selectedFood, setSelectedFood] = useState({
            id:"",
            name: "",
            type: "",
            price: "",
            details:"",
            description: ""

        });
    


        return<FoodContext.Provider value={{ handle,setHandle,foodBooking, setFoodBooking, selectedFood, setSelectedFood }}>
            { children }
    </FoodContext.Provider >
}
export {
    FoodProvider,
    FoodContext
};