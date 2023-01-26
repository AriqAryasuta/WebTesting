import { useState } from "react";
import { useCategoryContext } from "../../hooks/useCategoryContext";
import { useFacilityContext } from "../../hooks/useFacilityContext";
import { useFacilityHandleAdd } from "../../hooks/useFacilityHandleAdd";
import useFetch from "../../hooks/useFetch";

import AtributColumn from '../facility/atributColumn'

const AddFacility = ({ url, category, selfPopUp, chooseCatPopUp, addButtonVisible, setLoading, setError }) => {
    const { dispatch } = useFacilityContext();

    const [name, setName] = useState("")
    const [coordinat, setCoordinat] = useState("")
    const [imageURL, setImageURL] = useState("")
    const [atr1, setAtr1] = useState("")
    const [atr2, setAtr2] = useState("")
    const [atr3, setAtr3] = useState("")
    const [atr4, setAtr4] = useState("")
    const [atr5, setAtr5] = useState("")
    const catName = JSON.stringify(category.name).replace(/"/g, '')

    const atrVal = [
        atr1, atr2, atr3, atr4, atr5
    ]
    const atrSet = [
        setAtr1, setAtr2, setAtr3, setAtr4, setAtr5
    ]

    const backChooseCat = () => {
        selfPopUp(false)
        chooseCatPopUp(true)
    }

    const closeAdd = () => {
        selfPopUp(false)
        addButtonVisible(true)
    }

    const handleImage = (e) =>{
        const file = e.target.files[0];
        setFileToBase(file)
    }
    const setFileToBase = (file) =>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend=()=>{
            setImageURL(reader.result);
        }
    }

    const newFacility = {name, coordinat, category:catName, imageURL, atr1, atr2, atr3, atr4, atr5}
    const { handleAdd: handleSubmit } = useFacilityHandleAdd({ url, type: 'ADD_FACILITIES', dispatch, data: newFacility, setLoading, setError, closePopUp: closeAdd })

    return (
        <>
            <div className="overlay z-100"></div>
            <div className="container w-fit mx-auto">
                <form className="w-screen max-w-xl mx-8 bg-white shadow-xl rounded-3xl px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <div className="flex justify-between">
                        <button className="" onClick={(e) => backChooseCat()}>kembali</button>
                        <button className="" onClick={(e) => closeAdd()}>x</button>
                    </div>
                    <h3 className="text-center text-2xl font -bold mb-12">Tambah Fasilitas</h3>
                    <div className="mb-4">
                        <label>Kategori : </label>
                        <label>{category.name}</label>
                    </div>
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
                    <div className="mb-4">
                        {coordinat != "" && <label>Koordinat : </label>}
                        <input
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="coordinat"
                            type="text"
                            placeholder="Koordinat fasilitas"
                            onChange={(e) => setCoordinat(e.target.value)}
                            value={coordinat}
                        />
                    </div>
                    <div className="mb-4">
                        <label>Image : </label>
                        <input
                            required
                            className=""
                            id="coordinat"
                            type="file"
                            onChange={handleImage}
                            accept="image/png, image/jpeg"
                        />
                    </div>
                    {category.atribut.length > 0 && category.atribut.map((atribut, index) => (
                        <AtributColumn key={atribut} atribut={atribut} atrVal={atrVal[index]} atrSet={atrSet[index]} />
                    ))}
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
    )
}
export default AddFacility;