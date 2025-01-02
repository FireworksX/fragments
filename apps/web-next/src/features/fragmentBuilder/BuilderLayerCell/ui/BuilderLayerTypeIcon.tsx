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
import ImageIcon from '@/shared/icons/next/image.svg'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { LinkKey } from '@graph-state/core'
import { useGraph } from '@graph-state/react'
import { layerDirection, nodes } from '@fragments/plugin-fragment'
import { useBuilderLayerFlags } from '@/shared/hooks/fragmentBuilder/useBuilderLayerFlags'

interface BuilderLayerTypeIconProps {
  layerKey: LinkKey
  flags: unknown
  hasLayout?: boolean
  layoutDirection?: unknown
  primaryIconClassName?: string
  textIconClassName?: string
  fragmentIconClassName?: string
}

export const BuilderLayerTypeIcon: FC<BuilderLayerTypeIconProps> = animated(
  ({
    className,
    hasLayout,
    layoutDirection,
    layerKey,
    primaryIconClassName,
    textIconClassName,
    fragmentIconClassName
  }) => {
    const { documentManager } = useContext(BuilderContext)
    const [layerGraph] = useGraph(documentManager, layerKey)
    const type = layerGraph?._type

    if (type === nodes.Text) return <TextFrame className={textIconClassName} />
    if (type === nodes.FragmentInstance) return <FragmentInstanceIcon className={fragmentIconClassName} />
    if (type === nodes.Fragment) return <FragmentIcon className={primaryIconClassName} />
    if (type === nodes.Image) return <ImageIcon className={primaryIconClassName} />

    if (layerGraph?.isBreakpoint) return <BreakpointIcon className={primaryIconClassName} />

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
