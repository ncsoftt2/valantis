import {ChangeEvent, memo, useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {useAppSelector} from "src/common/hooks/useAppSelector";
import {useAppDispatch} from "src/common/hooks/useAppDispatch";
import {productThunk} from "src/features/products/slice/slice";

import s from './SelectBrands.module.scss'
import {getProductBrands} from "src/features/products/selectors/getProductBrands";

export const SelectBrands = memo(() => {
    const [searchParams, setSearchParams] = useSearchParams({})
    const brands = useAppSelector(getProductBrands)
    const dispatch = useAppDispatch()

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        searchParams.delete('offset')
        searchParams.delete('product')
        searchParams.delete('price')
        searchParams.set('action', 'filter')
        searchParams.set('brand', e.currentTarget.value)
        setSearchParams(searchParams)
        const payload = {action: 'filter', params: {brand: e.currentTarget.value}}
        dispatch(productThunk.fetchIdsProduct(payload))
    }


    useEffect(() => {
        dispatch(productThunk.fetchProductsBrand())
    }, [])

    return (
        <select className={s.select} onChange={handleChange}>
            <option disabled>Выбрать бренд</option>
            {
                brands.map(b => (
                    <option key={b}>{b}</option>
                ))
            }
        </select>
    )
})