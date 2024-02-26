import { Loader } from "src/common/assets/icons"
import s from './Preloader.module.scss'


export const Preloader = () => {
    return (
        <div className={s.preloader}>
            <Loader height={100} width={100} />
        </div>
    )
}