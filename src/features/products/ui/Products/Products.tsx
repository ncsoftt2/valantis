import {useAppSelector} from "src/common/hooks/useAppSelector";
import {useAppDispatch} from "src/common/hooks/useAppDispatch";
import {memo, useEffect} from "react";
import {productThunk} from "src/features/products/slice/slice";
import s from "./Products.module.scss";
import {ProductSkeleton} from "src/common/ui/ProductSkeleton/ProductSkeleton";
import {ErrorInfo} from "src/common/ui/Error";
import {getImageUrl} from "src/common/utils/getImageUrl";
import {PRODUCTS_IMAGES_URL} from "src/common/const";

type Props = {
    productIds: string[]
}

export const Products = memo(({productIds}: Props) => {
    const dispatch = useAppDispatch()
    const getItemsStatus = useAppSelector(state => state.products.getItemsStatus)
    const products = useAppSelector(state => state.products.products)
    useEffect(() => {
        dispatch(productThunk.fetchProducts(productIds))
    }, [productIds])

    return (
        <>
            {getItemsStatus === 'loading'
                ? <ProductSkeleton/>
                : getItemsStatus === 'failed'
                    ? <ErrorInfo/>
                    : (
                        <ul className={s.products}>

                            {products.map((p) => {
                                const imgUrl = getImageUrl()
                                return (
                                    <li className={s.product} key={p.id}>
                                        <img className={s.img} src={PRODUCTS_IMAGES_URL[imgUrl]} alt={p.product}/>
                                        <div className={s.product_title}>{p.product}</div>
                                        <div className={s.product_items}>
                                            <div>{p.price.toLocaleString('ru-RU')} &#8381;</div>
                                            <div className={s.product_item}>
                                                бренд: <span
                                                className={s.product_item_brand}>{p.brand || 'неизвестно'}</span>
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