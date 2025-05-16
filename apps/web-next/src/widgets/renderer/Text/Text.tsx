import { FC, use, useCallback, useContext } from 'react'
import styles from './styles.module.css'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { animated, to } from '@react-spring/web'
import { useBuilderManager } from '@/shared/hooks/fragmentBuilder/useBuilderManager'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { getResolvedValue } from '@fragmentsx/plugin-fragment-spring'
import { AnimatedHtml } from '@/shared/ui/AnimatedHtml'
import { wrapTextInParagraphWithAttributes } from '@/widgets/fragmentBuilder/BuilderText/lib/wrapTextInParagraphWithAttributes'
import { useLayerStyles } from '../hooks/useLayerStyles'
import { LinkKey } from '@graph-state/core'
import { FragmentInstanceContext } from '@/widgets/renderer/FragmentInstance'
import { BaseRenderNode, defaultRender, defaultRenderNode } from '@/widgets/renderer/Fragment'
import { useInstanceProp } from '@/widgets/renderer/hooks/useInstanceProp'
import { useFieldValue } from '@/shared/hooks/fragmentBuilder/useFieldValue'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'

interface TextProps extends BaseRenderNode {}

export const Text: FC<TextProps> = ({ layerKey, renderParents = [], render = defaultRender }) => {
  const { documentManager } = useBuilderDocument()
  const [layerGraph] = useGraph(documentManager, layerKey)
  const instanceContent = useFieldValue(layerKey, 'variableLink')
  const textContent = layerGraph?.getContent?.(instanceContent)
  const cssStyles = useLayerStyles(layerKey, renderParents)
  const { isTextEditing, focus } = useBuilderManager()

  return render(
    layerKey,
    <animated.div
      className={styles.root}
      data-key={layerKey}
      style={{
        ...cssStyles,
        opacity: isTextEditing && focus === layerKey ? 0 : cssStyles.opacity
      }}
    >
      <AnimatedHtml>{textContent}</AnimatedHtml>
    </animated.div>
  )
}
