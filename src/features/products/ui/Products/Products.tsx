import {useAppSelector} from "src/common/hooks/useAppSelector";
import {useAppDispatch} from "src/common/hooks/useAppDispatch";
import {memo, useEffect} from "react";
import {productThunk} from "src/features/products/slice/slice";
import s from "./Products.module.scss";
import {ProductSkeleton} from "src/common/ui/ProductSkeleton/ProductSkeleton";


const IMG_URL = 'https://juvelirnyj-lombard.ru/media/products/2707e2be37/zolotoe-kolco-s-brilliantami_preview_r6Ohq2H.webp'

export const Products = memo(() => {
    const products = useAppSelector(state => state.products.products)
    const status = useAppSelector(state => state.products.status)
    const productIds = useAppSelector(state => state.products.ids)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(productThunk.fetchProducts(productIds))
    }, [dispatch, productIds])

    return (
        <>
            {status === 'loading'
                ? <ProductSkeleton />
                : (
                <ul className={s.products}>

                    {products.map((p) => {
                        return (
                            <li className={s.product} key={p.id}>
                                <img className={s.img} src={IMG_URL} alt={p.product}/>
                                <div className={s.product_title}>{p.product}</div>
                                <div className={s.product_items}>
                                    <div>{p.price.toLocaleString('ru-RU')} &#8381;</div>
                                    <div className={s.product_item}>
                                        бренд: <span className={s.product_item_brand}>{p.brand || 'неизвестно'}</span>
                                    </div>
                                </div>
                                <div className={s.product_id}>{p.id}</div>
                            </li>
                        )
                    })}
                </ul>
            )}
        </>
    )
})