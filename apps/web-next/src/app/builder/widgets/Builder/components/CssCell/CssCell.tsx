import React, { FC, PropsWithChildren, ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Touchable from '@/app/components/Touchable'
import Cell from '@/app/builder/widgets/Builder/components/Cell/Cell'
import Button from '@/app/components/Button'

interface CssCellProps extends PropsWithChildren {
  description?: ReactNode
  className?: string
  onClick?: () => void
  onDelete?: () => void
}

const CssCell: FC<CssCellProps> = ({ className, children, description, onClick, onDelete }) => {
  return (
    <Touchable className={cn(styles.root, className)} TagName='button' onClick={onClick}>
      <Cell
        before={<div>C</div>}
        description={
          onDelete && (
            <div>
              <Button className={styles.actions} mode='secondary' onClick={() => onDelete()}>
                Delete
              </Button>
            </div>
          )
        }
      >
        {children}
      </Cell>
    </Touchable>
  )
}

export default CssCell
