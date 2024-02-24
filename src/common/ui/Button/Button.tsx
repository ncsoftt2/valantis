import {ComponentPropsWithoutRef} from "react";
import cn from 'classnames';

import s from './Button.module.scss'

type Props = ComponentPropsWithoutRef<'button'>

export const Button = (props: Props) => {
    const {children, className, ...rest} = props
    return (
        <button className={cn(s.btn, className)} {...rest}>{children}</button>
    )
}