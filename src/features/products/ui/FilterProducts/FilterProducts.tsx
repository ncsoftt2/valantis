import {ChangeEvent, memo, useEffect, useState, KeyboardEvent} from "react";
import {productThunk} from "src/features/products/slice/slice";
import {useAppDispatch} from "src/common/hooks/useAppDispatch";
import {SelectBrands} from "../SelectBrands/SelectBrands";

import {Button} from "src/common/ui/Button";
import {useProductPage} from "src/page/ProductPage/useProductPage";
import {useAppSelector} from "src/common/hooks/useAppSelector";
import s from './FilterProducts.module.scss'

type Props = {
    offset: number
    limit: number
    clearFilter: () => void
    price: number
}

export const FilterProducts = memo((props: Props) => {
    const {setSearchParams, searchParams} = useProductPage()
    const prices = useAppSelector(state => state.products.prices)
    const {offset, limit, clearFilter} = props
    const dispatch = useAppDispatch()
    const [currentPrice,setCurrentPrice] = useState(prices[0])
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

    const searchProductOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            handleClickSearchProductByName()
        }
    }

    const handleChangeFilterByPrice = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentPrice(prices[+e.target.value - 1])
    }
    const handleClickFilterByPrice = () => {
        searchParams.set('action', 'filter')
        searchParams.set('price', currentPrice === undefined ? prices[0].toString() : currentPrice.toString())
        searchParams.delete('offset')
        searchParams.delete('product')
        searchParams.delete('brand')
        setSearchParams(searchParams)
        const payload = {action: 'filter', params: {price: currentPrice, limit, offset}}
        dispatch(productThunk.fetchIdsProduct(payload))
    }

    useEffect(() => {
        dispatch(productThunk.fetchProductsPrice())
    }, [])
    return (
        <section className={s.filterWrapper}>
            <div className={s.search_item_wrapper}>
                <input placeholder={'Поиск по названию'}
                       className={s.input}
                       value={productName}
                       onChange={handleChangeProductName}
                       onKeyDown={searchProductOnEnter}
                />
                <Button onClick={handleClickSearchProductByName}>найти</Button>
            </div>
            <div className={s.priceWrapper}>
                <div>{currentPrice || prices[0]}</div>
                <input type="range" max={prices.length} onChange={handleChangeFilterByPrice}/>
                <Button onClick={handleClickFilterByPrice}>применить</Button>
            </div>
            <SelectBrands/>
            <Button onClick={clearFilter}>сбросить фильтр</Button>
        </section>
    )
})
