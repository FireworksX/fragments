import { FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { animated } from '@react-spring/web'
import TextFrame from '@/shared/icons/text-frame.svg'
import ColumnsFrame from '@/shared/icons/columns-frame.svg'
import RowsFrame from '@/shared/icons/rows-frame.svg'
import Frame from '@/shared/icons/frame.svg'
import FragmentInstanceIcon from '@/shared/icons/next/component.svg'
import BreakpointIcon from '@/shared/icons/next/square-dashed.svg'
import FragmentIcon from '@/shared/icons/next/box.svg'
import { layerDirection, nodes } from '@fragments/plugin-state'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { LinkKey } from '@graph-state/core'
import { useGraph } from '@graph-state/react'

interface BuilderLayerTypeIconProps {
  layerKey: LinkKey
  type: string
  hasLayout: boolean
  layoutDirection: string
  primaryIconClassName?: string
  textIconClassName?: string
  fragmentIconClassName?: string
}

export const BuilderLayerTypeIcon: FC<BuilderLayerTypeIconProps> = animated(
  ({
    className,
    type,
    layerKey,
    hasLayout,
    layoutDirection,
    primaryIconClassName,
    textIconClassName,
    fragmentIconClassName
  }) => {
    const { documentManager } = useContext(BuilderContext)
    const [layerGraph] = useGraph(documentManager, layerKey)

    if (type === nodes.Text) return <TextFrame className={textIconClassName} />
    if (type === nodes.FragmentInstance) return <FragmentInstanceIcon className={fragmentIconClassName} />
    if (type === nodes.Fragment) return <FragmentIcon className={primaryIconClassName} />

    if (layerGraph?._type === nodes.Breakpoint) return <BreakpointIcon className={primaryIconClassName} />

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
