import { FC, useCallback, useContext } from 'react'
import styles from './styles.module.css'
import { BuilderContext } from '@/builder/BuilderContext'
import { useParseRules } from '@/builder/renderer/Frame/hooks/useLayerRules/useParseRules'
import { useGraph } from '@graph-state/react'
import { animated } from '@react-spring/web'
import { useLayerInvoker } from '@/builder/hooks/useLayerInvoker'
import { withStyle } from '../providers/withStyle'
import { withDraggable } from '@/builder/renderer/providers/withDraggable'

interface TextProps {
  layerKey: string
  onClick?: (e, options) => void
  onMouseOver?: (e, options) => void
  onMouseLeave?: (e, options) => void
}

export const Text: FC<TextProps> = withStyle(
  withDraggable(props => {
    const { documentManager } = useContext(BuilderContext)
    const [layerValue] = useGraph(documentManager, props)
    const layerInvoker = useLayerInvoker(props)
    const textContent = layerInvoker('content').value
    const key = documentManager.keyOfEntity(props)

    return <animated.div className={styles.root} data-key={key} dangerouslySetInnerHTML={{ __html: textContent }} />
  })
)
