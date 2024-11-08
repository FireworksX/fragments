import { CSSProperties, FC, useContext } from 'react'
import { GraphState, LinkKey } from '@graph-state/core'
import { Frame } from '@/widgets/renderer/Frame/Frame'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'

export interface DocumentRenderer {
  layerKey?: LinkKey
  style?: CSSProperties
}

export const Fragment: FC<DocumentRenderer> = ({ layerKey, style }) => {
  const { documentManager } = useContext(BuilderContext)
  const [fragmentGraph] = useGraph(documentManager, layerKey)

  return fragmentGraph?.children?.map(childLink => <Frame key={childLink} layerKey={childLink} style={style} />)
}
