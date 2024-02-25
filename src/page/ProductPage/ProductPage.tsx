import {useAppDispatch} from "src/common/hooks/useAppDispatch";
import {useAppSelector} from "src/common/hooks/useAppSelector";
import {useEffect} from "react";
import {productThunk} from "src/features/products/slice/slice";
import {useProductPage} from "./useProductPage";
import {FilterProducts, Products} from "src/features/products";
import {Button} from "src/common/ui/Button";

import { Arrow } from "src/common/assets/icons";
import cn from "classnames";
import {ErrorInfo} from "src/common/ui/Error";
import s from "./ProductPage.module.scss";


const ProductPage = () => {
    const dispatch = useAppDispatch()
    const productIds = useAppSelector(state => state.products.ids)
    const status = useAppSelector(state => state.products.status)
    const {action,param,initialKey,searchParams,setSearchParams} = useProductPage()
    const offset = Number(searchParams.get('offset')) || 0
    const limit = Number(searchParams.get('limit')) || 50

    const handleChangeNext = () => {
        searchParams.set('offset', (offset + 50).toString())
        setSearchParams(searchParams)
    }
    const handleChangePrev = () => {
        searchParams.set('offset', (offset - 50).toString())
        setSearchParams(searchParams)
    }

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
    }, [offset, action, dispatch, initialKey, param, limit])

    const rightButton = productIds && productIds.length === 50



    return (
        <section className={s.products_list}>
            <FilterProducts limit={limit} offset={offset}/>
            {status === 'failed' && <ErrorInfo/>}
            {productIds && productIds.length > 0 && <Products/>}
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







