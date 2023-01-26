export const useFacilityHandleAdd = ({url, data, type, dispatch, setLoading, setError, closePopUp}) => {
    const add = async()=>{
        setLoading(true);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        })

        const json = await response.json();

        if (json.success) {
            dispatch({ type: type, payload: json.data });
            closePopUp();
            setLoading(false);
            setError(null);
        }
        if (!json.success) {
            setLoading(false);
            setError(json.error);
        }
    }

    const handleAdd = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        await add();
    }

    return {add, handleAdd};
}