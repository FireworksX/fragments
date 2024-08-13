import { useParseRules } from './hooks/useLayerRules/useParseRules'
import { FC, useCallback, useContext } from 'react'
import { BuilderContext } from '@/builder/BuilderContext'
import { animated } from '@react-spring/web'
import { useGraph } from '@graph-state/react'
import { builderNodes } from '@fragments/fragments-plugin/performance'
import { Text } from '@/builder/renderer/Text/Text'

interface LayerProps {
  layerKey: string
  onClick?: (e, options) => void
}

export const Layer: FC<LayerProps> = ({ layerKey, onClick }) => {
  const { documentManager } = useContext(BuilderContext)
  const { cssRules } = useParseRules(layerKey)
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

  if (layerValue?._type === builderNodes.Text) {
    return <Text layerKey={layerKey} onClick={onClick} />
  }

  return (
    <animated.div data-key={layerKey} style={cssRules} onClick={proxyOnClick}>
      {children.map(child => (
        <Layer key={child} layerKey={child} onClick={onClick} />
      ))}
    </animated.div>
  )
}
