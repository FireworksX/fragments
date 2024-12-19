import { CSSProperties, FC, useContext, useMemo } from 'react'
import { GraphState, LinkKey } from '@graph-state/core'
import { Frame } from '@/widgets/renderer/Frame'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { useMeasure } from 'react-use'
import styles from './styles.module.css'
import { renderTarget } from '@fragments/plugin-fragment'
import { useBreakpoints } from '@/shared/hooks/fragmentBuilder/useBreakpoints'
import { useRenderTarget } from '@/widgets/renderer/hooks/useRenderTarget'

export interface DocumentRenderer {
  layerKey?: LinkKey
  renderParents?: LinkKey[]
  // style?: CSSProperties
}

export const Fragment: FC<DocumentRenderer> = ({ layerKey, renderParents = [] }) => {
  const { documentManager } = useContext(BuilderContext)
  const [fragmentGraph] = useGraph(documentManager, layerKey)
  const { isDocument } = useRenderTarget()
  const [ref, { width }] = useMeasure()
  const { getThreshold, thresholds } = useBreakpoints(layerKey)
  const memoRenderParents = useMemo(() => [...renderParents, layerKey], [layerKey])

  if (isDocument) {
    const renderLayer = getThreshold(width)?.link

    return (
      <div ref={ref} className={styles.wrapper}>
        {renderLayer && <Frame layerKey={renderLayer} renderParents={memoRenderParents} />}
      </div>
    )
  }

  return fragmentGraph?.children?.map(childLink => (
    <Frame key={childLink} layerKey={childLink} renderParents={memoRenderParents} />
  ))
}
