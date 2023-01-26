const AtributColumn = ({atribut, atrVal, atrSet}) => {
    return ( 
        <>
            <div className="mb-2">
                {atrVal!="" && <label>{atribut} : </label>}
                <input
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e)=>atrSet(e.target.value)}
                    value={atrVal}
                    type="text"
                    placeholder={atribut}
                />
            </div>
        </>
     );
}
 
export default AtributColumn;