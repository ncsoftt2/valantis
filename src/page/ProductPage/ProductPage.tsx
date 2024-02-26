import {useAppDispatch} from "src/common/hooks/useAppDispatch";
import {useAppSelector} from "src/common/hooks/useAppSelector";
import {useEffect} from "react";
import {productThunk} from "src/features/products/slice/slice";
import {useProductPage} from "./useProductPage";
import {FilterProducts, Products} from "src/features/products";
import {Preloader} from "src/common/ui/Preloader";
import {Button} from "src/common/ui/Button";
import {Arrow} from "src/common/assets/icons";
import cn from "classnames";

import s from "./ProductPage.module.scss";
import {ErrorInfo} from "src/common/ui/Error";


const ProductPage = () => {
    const dispatch = useAppDispatch()
    const productIds = useAppSelector(state => state.products.ids)
    const getIdsStatus = useAppSelector(state => state.products.getIdsStatus)
    const {
        action,
        param,
        initialKey,
        offset,
        limit,
        price,
        clearFilter,
        handleChangePrev,
        handleChangeNext
    } = useProductPage()

    const rightButton = productIds && productIds.length === 50
    useEffect(() => {
        const payload = {
            action,
            params: {
                [initialKey]: param,
                offset,
                limit
            }
        }
        dispatch(productThunk.fetchIdsProduct(payload))
    }, [offset, action, param])


    return (
        <section className={s.products_list}>
            <FilterProducts limit={limit} offset={offset} clearFilter={clearFilter} price={price}/>
            {getIdsStatus === 'loading' && <Preloader/>}
            {getIdsStatus === 'failed' && <ErrorInfo/>}
            {productIds && productIds.length > 0 && <Products productIds={productIds}/>}
            {offset > 0 &&
                <Button className={cn(s.btn_item, s.btn_item_left)}
                        onClick={handleChangePrev}
                ><Arrow/></Button>
            }
            {rightButton &&
                <Button className={cn(s.btn_item, s.btn_item_right)}
                        onClick={handleChangeNext}
                ><Arrow className={s.icon_next}/></Button>
            }
        </section>
    )

}

export default ProductPage







