import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { animated } from '@react-spring/web'
import TextFrame from '@/shared/icons/text-frame.svg'
import ColumnsFrame from '@/shared/icons/columns-frame.svg'
import RowsFrame from '@/shared/icons/rows-frame.svg'
import Frame from '@/shared/icons/frame.svg'
import { layerDirection, nodes } from '@fragments/plugin-state'

interface BuilderLayerTypeIconProps {
  type: string
  hasLayout: boolean
  layoutDirection: string
  primaryIconClassName?: string
  textIconClassName?: string
}

export const BuilderLayerTypeIcon: FC<BuilderLayerTypeIconProps> = animated(
  ({ className, type, hasLayout, layoutDirection, primaryIconClassName, textIconClassName }) => {
    if (type === nodes.Text) return <TextFrame className={textIconClassName} />

    if (hasLayout) {
      return layoutDirection === layerDirection.horizontal ? (
        <ColumnsFrame className={primaryIconClassName} />
      ) : (
        <RowsFrame className={primaryIconClassName} />
      )
    }

    return <Frame className={primaryIconClassName} />
  }
)
