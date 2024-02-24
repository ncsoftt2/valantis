import {useAppDispatch} from "src/common/hooks/useAppDispatch";
import {useAppSelector} from "src/common/hooks/useAppSelector";
import {useSearchParams} from "react-router-dom";
import {ChangeEvent, useEffect, useState} from "react";
import {productThunk} from "src/features/products/slice/slice";
import s from "./ProductPage.module.css";
import {testFunction} from "src/testFunction";
import {SelectBrands} from "src/page/ProductPage/SelectBrands";



// V1
// const ProductPage = () => {
//     const dispatch = useAppDispatch()
//     const productIds = useAppSelector(state => state.products.ids)
//
//     const [searchParams, setSearchParams] = useSearchParams({})
//     const [param, setParam] = useState('')
//
//     const offset = Number(searchParams.get('offset')) || 0
//     const limit = Number(searchParams.get('limit')) || 50
//     const nameProduct = searchParams.get('product') === 'product' ? 'product' : String(searchParams.get('price'))
//     const clearFilter = () => {
//         setSearchParams({})
//         dispatch(productThunk.fetchIdsProduct({limit, offset,action:'get_ids'}))
//     }
//
//     const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
//         const target = e.currentTarget.value
//         setParam(target)
//     }
//
//     const handleChangeNext = (newOffset: number) => {
//         searchParams.set('offset', newOffset.toString())
//         setSearchParams(searchParams)
//     }
//     const handleChangePrev = (newOffset: number) => {
//         searchParams.set('offset', newOffset.toString())
//         setSearchParams(searchParams)
//     }
//
//     const handleChangeRange = (newValue: number) => {
//         searchParams.set('action', 'filter')
//         searchParams.set('price', newValue.toString())
//         searchParams.delete('offset')
//         searchParams.delete('product')
//         setSearchParams(searchParams)
//         dispatch(productThunk.fetchIdsProduct({limit, offset, action:'filter',param:newValue}))
//     }
//     const handleClick = () => {
//         if(param.trim().length !== 0) {
//             searchParams.set('action', 'filter')
//             searchParams.set('product', param.trim())
//             searchParams.delete('offset')
//             searchParams.delete('price')
//             setSearchParams(searchParams)
//             dispatch(productThunk.fetchIdsProduct({limit, offset, action:'filter',param:param.trim()}))
//         }
//     }
//     useEffect(() => {
//         const action = searchParams.get('action') || 'get_ids'
//         const param = searchParams.get('product') || Number(searchParams.get('price'))
//         dispatch(productThunk.fetchIdsProduct({limit, offset,action,param}))
//         dispatch(productThunk.fetchProductsBrand())
//     }, [offset])
//
//
//     const productsIdNextBtnLength = productIds && productIds.length === 50
//     const productsIdPrevBtnLength = offset === 0 || productIds && productIds.length > 50
//     return (
//         <section className={s.products_list}>
//             <input value={param} onChange={handleChange}/>
//             <button onClick={handleClick}>поиск</button>
//             <div style={{display:'flex',alignItems:'center'}}>
//                 <input type={'range'} value={nameProduct} min={0} max={500000} onChange={(e) =>handleChangeRange(+e.currentTarget.value)}/>
//                 <input type="number" value={nameProduct} onChange={(e) =>handleChangeRange(+e.currentTarget.value)}/>
//             </div>
//             <button onClick={clearFilter}>сбросить</button>
//             <div className={s.btns_wrapper}>
//                 {!productsIdPrevBtnLength &&
//                     <button className={s.btn} disabled={offset === 0} onClick={() => handleChangePrev(offset - 50)}>&lt;</button>
//                 }
//                 {productsIdNextBtnLength &&
//                     <button className={s.btn} onClick={() => handleChangeNext(offset + 50)}>&gt;</button>
//                 }
//             </div>
//             <div className={s.products}>
//                 {productIds && productIds.length > 0 && <Products />}
//             </div>
//         </section>
//     )
// }
//
// export default ProductPage



// V2
// const ProductPage = () => {
//     const dispatch = useAppDispatch()
//     const productIds = useAppSelector(state => state.products.ids)
//
//     const [searchParams, setSearchParams] = useSearchParams({})
//     const [param, setParam] = useState('')
//
//     const offset = Number(searchParams.get('offset')) || 0
//     const limit = Number(searchParams.get('limit')) || 50
//     // const nameProduct = searchParams.get('product') === 'product' ? 'product' : String(searchParams.get('price'))
//     const nameProduct = searchParams.get('product') ||searchParams.get('brand') || String(searchParams.get('price'))
//     const clearFilter = () => {
//         setSearchParams({})
//         const payload = {action:'get_ids',params: {limit, offset}}
//         dispatch(productThunk.fetchIdsProduct(payload))
//     }
//
//     const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
//         const target = e.currentTarget.value
//         setParam(target)
//     }
//
//     const handleChangeNext = (newOffset: number) => {
//         searchParams.set('offset', newOffset.toString())
//         setSearchParams(searchParams)
//     }
//     const handleChangePrev = (newOffset: number) => {
//         searchParams.set('offset', newOffset.toString())
//         setSearchParams(searchParams)
//     }
//
//     const handleChangeRange = (newValue: number) => {
//         searchParams.set('action', 'filter')
//         searchParams.set('price', newValue.toString())
//         searchParams.delete('offset')
//         searchParams.delete('product')
//         setSearchParams(searchParams)
//         const payload = {action:'filter',params: {price:newValue,limit, offset}}
//         dispatch(productThunk.fetchIdsProduct(payload))
//     }
//     const handleClick = () => {
//         if(param.trim().length !== 0) {
//             searchParams.set('action', 'filter')
//             searchParams.set('product', param.trim())
//             searchParams.delete('offset')
//             searchParams.delete('price')
//             setSearchParams(searchParams)
//             const payload = {
//                 action:'filter',
//                 params: {
//                     product:param.trim(),
//                     limit,
//                     offset
//                 }
//             }
//             dispatch(productThunk.fetchIdsProduct(payload))
//         }
//     }
//     const {param2,action,initialKey} = testFunction()
//     useEffect(() => {
//
//
//         const payload = {
//             action,
//             params: {
//                 [initialKey]: param2,
//                 offset,
//                 limit
//             }
//         };
//         dispatch(productThunk.fetchIdsProduct(payload));
//         dispatch(productThunk.fetchProductsBrand());
//     }, [offset])
//
//     const productsIdNextBtnLength = productIds && productIds.length === 50
//     const productsIdPrevBtnLength = offset === 0 || productIds && productIds.length > 50
//
//
//     return (
//         <section className={s.products_list}>
//             <input value={param} onChange={handleChange}/>
//             <button onClick={handleClick}>поиск</button>
//             <div style={{display:'flex',alignItems:'center'}}>
//                 <input type={'range'} value={nameProduct} min={0} max={500000} onChange={(e) =>handleChangeRange(+e.currentTarget.value)}/>
//                 <input type="number" value={nameProduct} onChange={(e) =>handleChangeRange(+e.currentTarget.value)}/>
//             </div>
//             <button onClick={clearFilter}>сбросить</button>
//             <div className={s.btns_wrapper}>
//                 {!productsIdPrevBtnLength &&
//                     <button className={s.btn} disabled={offset === 0} onClick={() => handleChangePrev(offset - 50)}>&lt;</button>
//                 }
//                 {productsIdNextBtnLength &&
//                     <button className={s.btn} onClick={() => handleChangeNext(offset + 50)}>&gt;</button>
//                 }
//             </div>
//             <div className={s.products}>
//                 {productIds && productIds.length > 0 && <Products />}
//             </div>
//         </section>
//     )
// }
//
// export default ProductPage


// V3
const ProductPage = () => {
    const dispatch = useAppDispatch()
    const productIds = useAppSelector(state => state.products.ids)


    const [searchParams, setSearchParams] = useSearchParams({})
    const offset = Number(searchParams.get('offset')) || 0
    const limit = Number(searchParams.get('limit')) || 50
    const price = searchParams.get('price') === null ? undefined : Number(searchParams.get('price'))

    const [productName, setProductName] = useState('')


    const handleChangeProductName = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.currentTarget.value
        setProductName(target.trim())
    }

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
        const payload = {action:'get_ids',params: {limit, offset}}
        dispatch(productThunk.fetchIdsProduct(payload))
    }


    const {action,param2,initialKey} = testFunction()

    useEffect(() => {
        const payload = {
            action,
            params: {
                [initialKey]: param2,
                offset,
                limit
            }
        };
        dispatch(productThunk.fetchIdsProduct(payload));
    }, [offset])

    return (
        <section className={s.products_list}>
            <div className={s.filterWrapper}>
                <input value={productName} onChange={handleChangeProductName}/>
                <button onClick={handleClickSearchProductByName}>поиск</button>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <input type="number" value={price} onChange={handleChangeFilterByPrice}/>
            </div>
            <button onClick={clearFilter}>сбросить</button>
            <SelectBrands />
            {/*<div className={s.btns_wrapper}>*/}
            {/*    {!productsIdPrevBtnLength &&*/}
            {/*        <button className={s.btn} disabled={offset === 0}*/}
            {/*                onClick={() => handleChangePrev(offset - 50)}>&lt;</button>*/}
            {/*    }*/}
            {/*    {productsIdNextBtnLength &&*/}
            {/*        <button className={s.btn} onClick={() => handleChangeNext(offset + 50)}>&gt;</button>*/}
            {/*    }*/}
            {/*</div>*/}
            <div className={s.products}>
                {productIds && productIds.length > 0 && <Products/>}
            </div>
        </section>
    )

}

export default ProductPage







const Products = () => {

    const products = useAppSelector(state => state.products.products)
    const productIds = useAppSelector(state => state.products.ids)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(productThunk.fetchProducts(productIds))
    }, [productIds])

    return (
        <>
            {products.map((p) => {
                return (
                    <div className={s.product} key={p.id}>
                        <div className={s.product_title}>{p.product}</div>
                        <div className={s.product_id}>{p.id}</div>
                        <div className={s.product_brand}>бренд: {p.brand || 'неизвестно'}</div>
                        <div className={s.product_price}>
                            цена: <span className={s.product_price_item}>{p.price.toLocaleString('ru-RU')}</span>
                        </div>
                    </div>
                )
            })}
        </>
    )
}