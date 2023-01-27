import { useState } from "react";
import { useCategoryContext } from "../../hooks/usecategoryContext";
import { useCategoryHandleAdd } from "../../hooks/useCategoryHandleAdd";

const AddCategory = ({url, selfPopUp, chooseCatPopUp, addButtonVisible, setLoading, setError}) => {
    const {dispatch2} = useCategoryContext();

    const [name, setName] = useState("")
    const [icon, setIcon] = useState("")
    const [atribut, setAtribut] = useState([""])
    const [atributType, setAtributType] = useState([""])

    const backChooseCat = () => {
        selfPopUp(false)
        chooseCatPopUp(true)
    }
    const closeAdd = () => {
        selfPopUp(false)
        addButtonVisible(true)
    }

    const newCategory = {name, icon, atribut, atributType};
    const {handleAdd: handleSubmit} = useCategoryHandleAdd({url, type:'ADD_CATEGORIES', dispatch2, data:newCategory, setLoading, setError, closePopUp:backChooseCat})

    return ( 
        <>
            {/* <div className="overlay z-100"></div> */}
            <div className="container w-fit mx-auto">
                <form className="w-screen max-w-xl mx-8 bg-white shadow-xl rounded-3xl px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="flex justify-between">
                        <button className="" onClick={(e) => backChooseCat()}>kembali</button>
                        <button className="" onClick={(e) => closeAdd()}>x</button>
                    </div>
                    <h3 className="text-center text-2xl font -bold mb-12">Tambah Fasilitas</h3>
                    <div className="mb-4">
                        {name != "" && <label className="">Nama : </label>}
                        <input
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="Nama fasilitas"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-lightblue mt-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus :outline-none focus:shadow-outline"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
     );
}
 
export default AddCategory;