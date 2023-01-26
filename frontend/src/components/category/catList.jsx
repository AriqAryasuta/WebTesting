const CatList=({category, setLoading, seterror})=>{
    return(
        <>
            <option key={category.name} value={JSON.stringify(category)}>
                {category.name}
            </option>
        </>
    )
}

export default CatList;