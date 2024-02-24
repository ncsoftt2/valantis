import {ChangeEvent, memo, useState} from "react";
import {productThunk} from "src/features/products/slice/slice";
import {useSearchParams} from "react-router-dom";
import {useAppDispatch} from "src/common/hooks/useAppDispatch";
import { SelectBrands } from "../SelectBrands/SelectBrands";

import s from './FilterProducts.module.scss'
import { Button } from "src/common/ui/Button";


type Props = {
    offset: number
    limit: number
}

export const FilterProducts = memo((props: Props) => {
    const {offset,limit} = props

    const dispatch = useAppDispatch()

    const [searchParams, setSearchParams] = useSearchParams({})

    const price = searchParams.get('price') === null ? 0 : Number(searchParams.get('price'))

    const [productName, setProductName] = useState('')


    const handleChangeProductName = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.currentTarget.value
        setProductName(target.trim())
    }

    // const handleClickSearchProductByName = () => {
    //     if (productName.trim().length !== 0) {
    //         searchParams.delete('offset')
    //         searchParams.delete('price')
    //         searchParams.set('action', 'filter')
    //         searchParams.set('product', productName.trim())
    //         setSearchParams(searchParams)
    //         const payload = {
    //             action: 'filter',
    //             params: {
    //                 product: productName.trim(),
    //                 limit,
    //                 offset
    //             }
    //         }
    //         dispatch(productThunk.fetchIdsProduct(payload))
    //     }
    // }
    const handleClickSearchProductByName = () => {
        if (productName.trim().length !== 0) {
            searchParams.delete('offset')
            searchParams.delete('price')
            searchParams.set('action', 'filter')
            searchParams.set('product', productName.trim())
            setSearchParams(searchParams)
            const payload = {
                action: 'filter',
                params: {
                    product: productName.trim(),
                    limit,
                    offset
                }
            }
            dispatch(productThunk.fetchIdsProduct(payload))
        }
    }

    const handleChangeFilterByPrice = (e: ChangeEvent<HTMLInputElement>) => {
        const target = Number(e.currentTarget.value)
        searchParams.set('action', 'filter')
        searchParams.set('price', target.toString())
        searchParams.delete('offset')
        searchParams.delete('product')
        setSearchParams(searchParams)
        const payload = {action:'filter',params: {price:target,limit, offset}}
        dispatch(productThunk.fetchIdsProduct(payload))
    }

    const clearFilter = () => {
        setSearchParams({})
    }

    return (
        <section className={s.filterWrapper}>
            <div className={s.search_item_wrapper}>
                <input placeholder={'Поиск по названию'}
                       className={s.input}
                       value={productName}
                       onChange={handleChangeProductName}
                />
                <Button onClick={handleClickSearchProductByName}>найти</Button>
            </div>
            <div>
                <input type="number" value={price} onChange={handleChangeFilterByPrice}/>
            </div>
            <SelectBrands />
            <Button onClick={clearFilter}>сбросить фильтр</Button>
        </section>
    )
})