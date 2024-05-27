import { FC, PropsWithChildren, ReactNode } from 'react'
import { Color } from 'react-color'
import cn from 'classnames'
import styles from './styles.module.css'
import Touchable from '@/app/components/Touchable'
import { useDisplayColor } from '@/app/builder/widgets/Builder/hooks/useDisplayColor'
import Cell from '@/app/builder/widgets/Builder/components/Cell/Cell'

interface ColorCellProps extends PropsWithChildren {
  color: Color
  sizeColor?: number
  description?: ReactNode
  className?: string
  onClick?: () => void
}

const ColorCell: FC<ColorCellProps> = ({ className, sizeColor = 10, color, children, description, onClick }) => {
  const { color: parsedColor } = useDisplayColor(color)

  return (
    <Touchable className={cn(styles.root, className)} TagName='button' onClick={onClick}>
      <Cell
        before={
          <div
            className={styles.color}
            style={{
              '--size': `${sizeColor}px`,
              background: parsedColor
            }}
            color={parsedColor}
          />
        }
        description={description}
      >
        {children}
      </Cell>
    </Touchable>
  )
}

export default ColorCell
