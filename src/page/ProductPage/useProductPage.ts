import {useSearchParams} from "react-router-dom";

export const useProductPage = () => {
    const [searchParams, setSearchParams] = useSearchParams(new URLSearchParams(window.location.search))
    const offset = Number(searchParams.get('offset')) || 0
    const limit = Number(searchParams.get('limit')) || 50
    const price = searchParams.get('price') === null ? 0 : Number(searchParams.get('price'))
    const keys = searchParams.keys();
    let initialKey = keys.next().value;
    if (initialKey === 'action') {
        initialKey = keys.next().value;
    }
    const action = searchParams.get('action') || 'get_ids'
    const param = searchParams.get('product') || Number(searchParams.get('price')) || searchParams.get('brand') || ''

    const clearFilter = () => {
        setSearchParams({})
    }

    const handleChangeNext = () => {
        searchParams.set('offset', (offset + 50).toString())
        setSearchParams(searchParams)
    }
    const handleChangePrev = () => {
        searchParams.set('offset', (offset - 50).toString())
        setSearchParams(searchParams)
    }

    return {
        offset,
        limit,
        action,
        price,
        param,
        initialKey,
        searchParams,
        setSearchParams,
        clearFilter,
        handleChangeNext,
        handleChangePrev
    }
}