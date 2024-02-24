import s from './ProductSkeleton.module.scss'
import cn from "classnames";

export const ProductSkeleton = () => {
    const arr = [...Array(10)].map((_, index) => index + 1)
    return (
        <div className={s.products}>
            {arr.map(el => {
                return (
                    <div className={s.product} key={el}>
                        <div className={s.skeleton}>
                            <div className={cn(s.skeleton__mini, s.pulse)}></div>
                            <div className={cn(s.skeleton__title, s.pulse)}></div>
                            <div className={s.skeleton_wrapper_items}>
                                <div className={cn(s.skeleton__block, s.pulse)}></div>
                                <div className={cn(s.skeleton__block, s.pulse)}></div>
                            </div>
                            <div className={cn(s.skeleton__id, s.pulse)}></div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}