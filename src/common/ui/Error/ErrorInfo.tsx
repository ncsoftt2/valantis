import s from "./ErrorInfo.module.scss";
import {Button} from "src/common/ui/Button";

export const ErrorInfo = () => {
    const reloadPage = () => {
        window.location.reload();
    }
    return (
        <div className={s.error}>
            <span>
                Произошла ошибка
                </span>
                 <Button variant="text" onClick={reloadPage}>перезагрузить страницу</Button>
        </div>
    )
}