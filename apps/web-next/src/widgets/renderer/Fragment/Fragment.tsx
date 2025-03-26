import React, { CSSProperties, ElementType, FC, ReactNode, useContext, useMemo } from 'react'
import { GraphState, LinkKey } from '@graph-state/core'
import { Frame } from '@/widgets/renderer/Frame'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { useMeasure } from 'react-use'
import styles from './styles.module.css'
import { useBreakpoints } from '@/shared/hooks/fragmentBuilder/useBreakpoints'
import { useRenderTarget } from '@/widgets/renderer/hooks/useRenderTarget'
import { animated } from '@react-spring/web'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'

export interface BaseRenderNode {
  layerKey?: LinkKey
  renderParents?: LinkKey[]
  render?: (layerKey: LinkKey, node: ReactNode) => ReactNode
}

export const defaultRender = (_, node) => node

export interface DocumentRenderer extends BaseRenderNode {
  // style?: CSSProperties
}

export const Fragment: FC<DocumentRenderer> = ({ layerKey, renderParents = [], render = defaultRender }) => {
  const { documentManager } = useBuilderDocument()
  const [fragmentGraph] = useGraph(documentManager, layerKey)
  const { isDocument } = useRenderTarget()
  const [ref, { width }] = useMeasure()
  const { getThreshold, thresholds } = useBreakpoints(layerKey)
  const memoRenderParents = useMemo(() => [...renderParents, layerKey], [layerKey])

  if (isDocument) {
    const renderLayer = getThreshold(width)?.link

    return render(
      layerKey,
      <div ref={ref} className={styles.wrapper}>
        {renderLayer && <Frame layerKey={renderLayer} renderParents={memoRenderParents} />}
      </div>
    )
  }

  if (render) {
    return render(
      layerKey,
      fragmentGraph?.children?.map(childLink => (
        <Frame key={childLink} layerKey={childLink} renderParents={memoRenderParents} render={render} />
      ))
    )
  }
}
