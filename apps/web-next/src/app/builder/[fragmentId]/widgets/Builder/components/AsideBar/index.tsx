import {FC, PropsWithChildren} from "react";
import cn from 'classnames'
import styles from './styles.module.css'

interface AsideBarProps extends PropsWithChildren {
    className?: string
}

const AsideBar: FC<AsideBarProps> = ({className, children}) => <div
    className={cn(className, styles.root)}>{children}</div>

export default AsideBar
