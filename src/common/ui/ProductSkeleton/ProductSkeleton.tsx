import s from './ProductSkeleton.module.css'

export const ProductSkeleton = () => {
    const arr = [...Array(10)].map((_, index) => index + 1)
    return (
        <div className={s.products}>
            {arr.map(el => {
                return (
                    <div className={s.product} key={el}>
                        <div className={s.skeletion_item}/>
                        <div className={s.skeletion_item}/>
                        <div className={s.skeletion_item}/>
                    </div>
                )
            })}
        </div>
    )
}