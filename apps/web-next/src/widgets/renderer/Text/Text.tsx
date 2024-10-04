import { FC, useCallback, useContext } from 'react'
import styles from './styles.module.css'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { animated } from '@react-spring/web'
import { withStyle } from '../providers/withStyle'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'

interface TextProps {
  layerKey: string
  onClick?: (e, options) => void
  onMouseOver?: (e, options) => void
  onMouseLeave?: (e, options) => void
}

export const Text: FC<TextProps> = withStyle(props => {
  const { documentManager } = useContext(BuilderContext)
  const [layerValue] = useGraph(documentManager, props)
  const layerInvoker = useLayerInvoker(props)
  const textContent = layerInvoker('content').value
  const key = documentManager.keyOfEntity(props)

  return (
    <animated.div
      className={styles.root}
      data-key={key}
      style={props.style}
      dangerouslySetInnerHTML={{ __html: textContent }}
    />
  )
})
