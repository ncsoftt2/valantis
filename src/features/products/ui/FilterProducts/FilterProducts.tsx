import {ChangeEvent, memo, useState} from "react";
import {productThunk} from "src/features/products/slice/slice";
import {useAppDispatch} from "src/common/hooks/useAppDispatch";
import {SelectBrands} from "../SelectBrands/SelectBrands";

import s from './FilterProducts.module.scss'
import {Button} from "src/common/ui/Button";
import {useProductPage} from "src/page/ProductPage/useProductPage";

type Props = {
    offset: number
    limit: number
    clearFilter: () => void
    price: number
}

export const FilterProducts = memo((props: Props) => {
    const {setSearchParams,searchParams} = useProductPage()

    const {offset, limit,clearFilter,price} = props

    const dispatch = useAppDispatch()

    const [productName, setProductName] = useState('')

    const handleChangeProductName = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.currentTarget.value
        setProductName(target)
    }

    const handleClickSearchProductByName = () => {
        if (productName.trim().length !== 0) {
            searchParams.delete('offset')
            searchParams.delete('price')
            searchParams.delete('brand')
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
        searchParams.delete('brand')
        setSearchParams(searchParams)
        const payload = {action: 'filter', params: {price: target, limit, offset}}
        dispatch(productThunk.fetchIdsProduct(payload))
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
            <SelectBrands/>
            <Button onClick={clearFilter}>сбросить фильтр</Button>
        </section>
    )
})