import {useAppSelector} from "src/common/hooks/useAppSelector";
import {ChangeEvent, memo, useEffect, useState} from "react";
import {useAppDispatch} from "src/common/hooks/useAppDispatch";
import {productThunk} from "src/features/products/slice/slice";
import {useSearchParams} from "react-router-dom";

export const SelectBrands = memo(() => {
    const [searchParams,setSearchParams] = useSearchParams({})
    const brands = useAppSelector(state => state.products.brands)
    const dispatch = useAppDispatch()
    const [brand, setBrand] = useState(brands[0])

    const handleChange = (e:ChangeEvent<HTMLSelectElement>) => {
        searchParams.delete('offset')
        searchParams.delete('product')
        searchParams.delete('price')
        searchParams.set('brand', e.currentTarget.value)
        setSearchParams(searchParams)
        const payload = {action:'filter',params: {brand: e.currentTarget.value}}
        dispatch(productThunk.fetchIdsProduct(payload))
    }


    useEffect(() => {
        dispatch(productThunk.fetchProductsBrand());
    }, [])

    console.log(brand)

    return (
        <div>
            <select onChange={handleChange}>
                <option value={brand} disabled >Выбрать бренд</option>
                {
                    brands.map(b => (
                        <>

                            <option key={b}>{b}</option>
                        </>

                    ))
                }
            </select>

        </div>
    )
})