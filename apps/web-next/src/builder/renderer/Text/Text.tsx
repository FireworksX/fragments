import { FC, useCallback, useContext } from 'react'
import styles from './styles.module.css'
import { BuilderContext } from '@/builder/BuilderContext'
import { useParseRules } from '@/builder/renderer/Frame/hooks/useLayerRules/useParseRules'
import { useGraph } from '@graph-state/react'
import { animated } from '@react-spring/web'
import { useLayerInvoker } from '@/builder/hooks/useLayerInvoker'
import { withProps } from '@/builder/renderer/providers/withProps'

interface TextProps {
  layerKey: string
  onClick?: (e, options) => void
  onMouseOver?: (e, options) => void
  onMouseLeave?: (e, options) => void
}

export const Text: FC<TextProps> = withProps(props => {
  const { documentManager } = useContext(BuilderContext)
  const { cssRules } = useParseRules(props)
  const [layerValue] = useGraph(documentManager, props)
  const layerInvoker = useLayerInvoker(props)
  const textContent = layerInvoker('content').value
  const key = documentManager.keyOfEntity(props)

  const proxyOnClick = (e: any) => {
    props.onClick?.(e, {
      layerKey: key
    })
  }

  return (
    <animated.div
      className={styles.root}
      data-key={key}
      style={cssRules}
      onClick={proxyOnClick}
      dangerouslySetInnerHTML={{ __html: textContent }}
    />
  )
})
