import {useAppDispatch} from "src/common/hooks/useAppDispatch";
import {useAppSelector} from "src/common/hooks/useAppSelector";
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {productThunk} from "src/features/products/slice/slice";
import {useTestFunction} from "src/useTestFunction";
import {FilterProducts, Products} from "src/features/products";

import s from "src/page/ProductPage/ProductPage.module.scss";
import {ProductSkeleton} from "src/common/ui/ProductSkeleton/ProductSkeleton";


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
    const status = useAppSelector(state => state.products.status)

    const [searchParams, setSearchParams] = useSearchParams({})
    const offset = Number(searchParams.get('offset')) || 0
    const limit = Number(searchParams.get('limit')) || 50
    const {action,param,initialKey} = useTestFunction()

    const payload = {
        action,
        params: {
            [initialKey]: param,
            offset,
            limit
        }
    }
    useEffect(() => {
        dispatch(productThunk.fetchIdsProduct(payload)).unwrap()
            .catch(() => {
                dispatch(productThunk.fetchIdsProduct(payload))
            })
    }, [offset,action])

    return (
        <section className={s.products_list}>
            <FilterProducts limit={limit} offset={offset}/>
            {/*<div className={s.btns_wrapper}>*/}
            {/*    {!productsIdPrevBtnLength &&*/}
            {/*        <button className={s.btn} disabled={offset === 0}*/}
            {/*                onClick={() => handleChangePrev(offset - 50)}>&lt;</button>*/}
            {/*    }*/}
            {/*    {productsIdNextBtnLength &&*/}
            {/*        <button className={s.btn} onClick={() => handleChangeNext(offset + 50)}>&gt;</button>*/}
            {/*    }*/}
            {/*</div>*/}

            {/*{status === 'loading' && <ProductSkeleton />}*/}
            {/*{productIds && productIds.length > 0 && <Products/>}                   */}

            {productIds && productIds.length > 0 && <Products/>}

        </section>
    )

}

export default ProductPage







