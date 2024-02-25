import {ComponentPropsWithoutRef} from "react";
import cn from 'classnames';

import s from './Button.module.scss'

type Props = {
    variant?: 'text' | 'primary'
} & ComponentPropsWithoutRef<'button'>

export const Button = (props: Props) => {
    const {children, variant = 'primary' ,className, ...rest} = props


    return (
        <button className={cn(s.btn, s[variant], className)} {...rest}>{children}</button>
    )
}