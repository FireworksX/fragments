import React, { FC, PropsWithChildren, ReactNode } from 'react'
import { Color } from 'react-color'
import cn from 'classnames'
import styles from './styles.module.css'
import { animated, Interpolation, to } from '@react-spring/web'
import { Touchable } from '@/shared/ui/Touchable'
import { Button } from '@/shared/ui/Button'
import { Cell } from '@/shared/ui/Cell'
import { objectToColorString } from '@fragments/utils'

interface ColorCellProps extends PropsWithChildren {
  color: Color | Interpolation<Color>
  sizeColor?: number
  className?: string
  onClick?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

const ColorCell: FC<ColorCellProps> = ({ className, sizeColor = 10, color, children, onClick, onDelete, onEdit }) => {
  return (
    <Touchable className={cn(styles.root, className)} TagName='button' onClick={onClick}>
      <Cell
        before={
          <animated.div
            className={styles.color}
            style={{
              '--size': `${sizeColor}px`,
              background: to(color, objectToColorString)
            }}
          />
        }
        description={
          <>
            {onEdit && (
              <div>
                <Button
                  className={styles.actions}
                  mode='secondary'
                  onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    onEdit()
                  }}
                >
                  Edit
                </Button>
              </div>
            )}
            {onDelete && (
              <div>
                <Button
                  className={styles.actions}
                  mode='secondary'
                  onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    onDelete()
                  }}
                >
                  Delete
                </Button>
              </div>
            )}
          </>
        }
      >
        {children}
      </Cell>
    </Touchable>
  )
}

export default ColorCell
