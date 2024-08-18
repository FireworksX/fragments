import { FC, useCallback, useContext } from 'react'
import styles from './styles.module.css'
import { BuilderContext } from '@/builder/BuilderContext'
import { useParseRules } from '@/builder/renderer/Layer/hooks/useLayerRules/useParseRules'
import { useGraph } from '@graph-state/react'
import { animated } from '@react-spring/web'
import { useLayerInvoker } from '@/builder/hooks/useLayerInvoker'

interface TextProps {
  layerKey: string
  onClick?: (e, options) => void
  onMouseOver?: (e, options) => void
  onMouseLeave?: (e, options) => void
}

export const Text: FC<TextProps> = ({ layerKey, onClick, onMouseOver, onMouseLeave }) => {
  const { documentManager } = useContext(BuilderContext)
  const { cssRules } = useParseRules(layerKey)
  const [layerValue] = useGraph(documentManager, layerKey)
  const layerInvoker = useLayerInvoker(layerKey)
  const textContent = layerInvoker('content').value

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

  return (
    <animated.div
      className={styles.root}
      data-key={layerKey}
      style={cssRules}
      onClick={proxyOnClick}
      onMouseOver={proxyOnMouseOver}
      onMouseLeave={proxyOnMouseLeave}
      dangerouslySetInnerHTML={{ __html: textContent }}
    />
  )
}
