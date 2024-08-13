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
}

export const Text: FC<TextProps> = ({ layerKey, onClick }) => {
  const { documentManager } = useContext(BuilderContext)
  const { cssRules } = useParseRules(layerKey)
  const [layerValue] = useGraph(documentManager, layerKey)
  const layerInvoker = useLayerInvoker(layerKey)
  const textContent = layerInvoker('content').value

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
    <animated.div
      className={styles.root}
      data-key={layerKey}
      style={cssRules}
      onClick={proxyOnClick}
      dangerouslySetInnerHTML={{ __html: textContent }}
    />
  )
}
