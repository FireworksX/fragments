import { useParseRules } from './hooks/useLayerRules/useParseRules'
import { FC, useCallback, useContext } from 'react'
import { BuilderContext } from '@/builder/BuilderContext'
import { animated, Interpolation, SpringValue, to } from '@react-spring/web'
import { useGraph } from '@graph-state/react'
import { builderNodes } from '@fragments/fragments-plugin/performance'
import { Text } from '@/builder/renderer/Text/Text'

interface LayerProps {
  layerKey: string
  onClick?: (e, options) => void
  onMouseOver?: (e, options) => void
  onMouseLeave?: (e, options) => void
}

const One = new SpringValue(0.3)
const Two = new SpringValue(0.7)

export const Layer: FC<LayerProps> = ({ layerKey, onClick, onMouseOver, onMouseLeave }) => {
  const { documentManager } = useContext(BuilderContext)
  const { cssRules } = useParseRules(layerKey)
  const [layerValue] = useGraph(documentManager, layerKey)
  const children = layerValue.children ?? []

  const proxyOnClick = useCallback(
    (e: any) => {
      onClick?.(e, {
        layerKey
      })
    },
    [layerKey, onClick]
  )

  const proxyOnMouseOver = useCallback(
    (e: any) => {
      onMouseOver?.(e, { layerKey })
    },
    [layerKey, onMouseOver]
  )

  const proxyOnMouseLeave = useCallback(
    (e: any) => {
      onMouseLeave?.(e, { layerKey })
    },
    [layerKey, onMouseLeave]
  )

  if (layerValue?._type === builderNodes.Text) {
    return (
      <Text layerKey={layerKey} onClick={onClick} onMouseOver={proxyOnMouseOver} onMouseLeave={proxyOnMouseLeave} />
    )
  }

  return (
    <>
      <animated.div
        data-key={layerKey}
        style={cssRules}
        onClick={proxyOnClick}
        onMouseOver={proxyOnMouseOver}
        onMouseLeave={proxyOnMouseLeave}
      >
        {children.map(child => (
          <Layer key={child} layerKey={child} onClick={onClick} onMouseLeave={onMouseLeave} onMouseOver={onMouseOver} />
        ))}
      </animated.div>
    </>
  )
}
