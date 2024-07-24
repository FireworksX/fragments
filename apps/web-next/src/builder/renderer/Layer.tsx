import { useParseRules } from '@/builder/renderer/useLayerRules/useParseRules'
import { FC, useCallback, useContext } from 'react'
import { BuilderContext } from '@/builder/BuilderContext'
import { animated } from '@react-spring/web'
import { useGraph } from '@graph-state/react'

interface LayerProps {
  layerKey: string
  onClick?: (e, options) => void
}

export const Layer: FC<LayerProps> = ({ layerKey, onClick }) => {
  const { documentManager } = useContext(BuilderContext)
  const { cssRules, textContent } = useParseRules(layerKey)
  const [layerValue] = useGraph(documentManager, layerKey)
  const children = layerValue.children ?? []

  const proxyOnClick = useCallback(
    (e: any) => {
      if (onClick) {
        onClick(e, {
          layerKey
          // ...componentContext,
        })
      }
    },
    [layerKey, onClick]
  )

  return (
    <animated.div data-key={layerKey} style={cssRules} onClick={proxyOnClick}>
      {textContent || children.map(child => <Layer key={child} layerKey={child} onClick={onClick} />)}
    </animated.div>
  )
}
