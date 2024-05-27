import { FC, PropsWithChildren, ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Touchable from '@/app/components/Touchable'
import Cell from '@/app/builder/widgets/Builder/components/Cell/Cell'

interface CssCellProps extends PropsWithChildren {
  description?: ReactNode
  className?: string
  onClick?: () => void
}

const CssCell: FC<CssCellProps> = ({ className, children, description, onClick }) => {
  return (
    <Touchable className={cn(styles.root, className)} TagName='button' onClick={onClick}>
      <Cell before={<div>C</div>} description={description}>
        {children}
      </Cell>
    </Touchable>
  )
}

export default CssCell
