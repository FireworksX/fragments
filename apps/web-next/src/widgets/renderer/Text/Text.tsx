import { FC, use, useCallback, useContext } from 'react'
import styles from './styles.module.css'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { animated, to } from '@react-spring/web'
import { useBuilderManager } from '@/shared/hooks/fragmentBuilder/useBuilderManager'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { getResolvedValue } from '@fragments/plugin-fragment-spring'
import { AnimatedHtml } from '@/shared/ui/AnimatedHtml'
import { wrapTextInParagraphWithAttributes } from '@/widgets/fragmentBuilder/BuilderText/lib/wrapTextInParagraphWithAttributes'
import { useLayerStyles } from '@/shared/hooks/fragmentBuilder/useLayerStyles'
import { LinkKey } from '@graph-state/core'
import { FragmentInstanceContext } from '@/widgets/renderer/FragmentInstance'

interface TextProps {
  layerKey: string
  renderParents: LinkKey[]
}

export const Text: FC<TextProps> = ({ layerKey, renderParents }) => {
  const { documentManager, builderManager } = use(BuilderContext)
  const { readProperty } = use(FragmentInstanceContext)
  const [layerGraph] = useGraph(documentManager, layerKey)
  const textContent = layerGraph?.getContent?.(readProperty(layerGraph?.variableLink))
  const cssStyles = useLayerStyles(layerKey, renderParents)
  const { isTextEditing, focus } = useBuilderManager()

  return (
    <AnimatedHtml
      className={styles.root}
      data-key={layerKey}
      style={{
        ...cssStyles,
        opacity: isTextEditing && focus === layerKey ? 0 : cssStyles.opacity
      }}
    >
      {textContent}
    </AnimatedHtml>
  )
}
