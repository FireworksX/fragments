import { CSSProperties, FC, useContext } from 'react'
import { GraphState, LinkKey } from '@graph-state/core'
import { Frame } from '@/widgets/renderer/Frame/Frame'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { useMeasure } from 'react-use'
import { renderTarget } from '@fragments/plugin-fragment'
import { useBreakpoints } from '@/shared/hooks/fragmentBuilder/useBreakpoints'

export interface DocumentRenderer {
  layerKey?: LinkKey
  style?: CSSProperties
}

export const Fragment: FC<DocumentRenderer> = ({ layerKey, style }) => {
  const { documentManager } = useContext(BuilderContext)
  const [fragmentGraph] = useGraph(documentManager, layerKey)
  const fragmentRenderTarget = fragmentGraph.renderTarget
  const [ref, { width }] = useMeasure()
  const { getThreshold } = useBreakpoints()

  if (fragmentRenderTarget === renderTarget.document) {
    const renderLayer = getThreshold(width)?.link

    return <div ref={ref}>{renderLayer && <Frame layerKey={renderLayer} style={style} />}</div>
  }

  return fragmentGraph?.children?.map(childLink => <Frame key={childLink} layerKey={childLink} style={style} />)
}
