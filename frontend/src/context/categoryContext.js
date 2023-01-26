import { createContext, useReducer } from "react";

export const CategoryContext = createContext();

export const categoryReducer = (state, action) => {
    switch(action.type){
        case 'GET_CATEGORIES':
            return{
                categories: action.payload
            }
        case 'ADD_CATEGORIES':
            return{
                categories:[action.payload, ...state.categories]
            }
        case 'EDIT_CATEGORIES':
            return{
                categories: state.categories.map((item)=>{
                    return item.facID !== action.payload.facID ? item:action.payload
                })
            }
        case 'DELETE_CATEGORIES':
            return{
                categories: state.categories.filter((item)=>{
                    return item.facID !== action.payload.facID
                })
            }
        default:
            return state
    }
}

const CategoriesContextProvider = ({children})=>{
    const [state, dispatch2] = useReducer(categoryReducer, {
        categories: null
    })

    return(
        <CategoryContext.Provider value={{ ...state, dispatch2}}>
            {children}
        </CategoryContext.Provider>
    )
}

export default CategoriesContextProvider