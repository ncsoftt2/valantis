import {useSearchParams} from "react-router-dom";

export const useProductPage = () => {
    const [searchParams, setSearchParams] = useSearchParams(new URLSearchParams(window.location.search))
    const keys = searchParams.keys();
    let initialKey = keys.next().value;
    while (initialKey === 'action') {
        initialKey = keys.next().value;
    }
    const action = searchParams.get('action') || 'get_ids'
    const param = searchParams.get('product') || Number(searchParams.get('price')) || searchParams.get('brand') || ''
    return {action,param, initialKey,searchParams,setSearchParams}
}