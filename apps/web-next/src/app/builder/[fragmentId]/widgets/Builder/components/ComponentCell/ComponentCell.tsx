import React, { FC, PropsWithChildren, ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Touchable from '@/app/components/Touchable'
import Cell from '@/app/builder/widgets/Builder/components/Cell/Cell'
import ComponentFrame from '@/app/svg/component-frame.svg'
import Button from '@/app/components/Button'

interface ComponentCellProps extends PropsWithChildren {
  className?: string
  onClick?: () => void
  onInsert?: () => void
}

const ComponentCell: FC<ComponentCellProps> = ({ className, children, onInsert, onClick }) => {
  return (
    <Touchable className={cn(styles.root, className)} TagName='button' onClick={onClick}>
      <Cell
        before={<ComponentFrame className={styles.icon} width={10} />}
        description={
          onInsert && (
            <div>
              <Button className={styles.actions} mode='secondary' onClick={() => onInsert()}>
                Insert
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

export default ComponentCell
