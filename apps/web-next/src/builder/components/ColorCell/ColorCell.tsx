import React, { FC, PropsWithChildren, ReactNode } from 'react'
import { Color } from 'react-color'
import cn from 'classnames'
import styles from './styles.module.css'
import Touchable from '@/app/components/Touchable'
import Button from '@/app/components/Button'
import { useDisplayColor } from '@/builder/hooks/useDisplayColor'
import Cell from '@/builder/components/Cell/Cell'
import { animated } from '@react-spring/web'

interface ColorCellProps extends PropsWithChildren {
  color: Color
  sizeColor?: number
  className?: string
  onClick?: () => void
  onDelete?: () => void
}

const ColorCell: FC<ColorCellProps> = ({ className, sizeColor = 10, color, children, onClick, onDelete }) => {
  const { color: parsedColor } = useDisplayColor(color)

  return (
    <Touchable className={cn(styles.root, className)} TagName='button' onClick={onClick}>
      <Cell
        before={
          <animated.div
            className={styles.color}
            style={{
              '--size': `${sizeColor}px`,
              background: parsedColor
            }}
          />
        }
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

export default ColorCell
