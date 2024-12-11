import { FC, useCallback, useContext } from 'react'
import styles from './styles.module.css'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { animated, to } from '@react-spring/web'
import { useBuilderManager } from '@/shared/hooks/fragmentBuilder/useBuilderManager'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { getResolvedValue } from '@fragments/plugin-fragment-spring'
import { AnimatedHtml } from '@/shared/ui/AnimatedHtml'
import { wrapTextInParagraphWithAttributes } from '@/widgets/fragmentBuilder/BuilderText/lib/wrapTextInParagraphWithAttributes'

interface TextProps {
  layerKey: string
}

export const Text: FC<TextProps> = ({ layerKey }) => {
  const { documentManager, builderManager } = useContext(BuilderContext)
  const [layerGraph] = useGraph(documentManager, layerKey)
  const layerInvoker = useLayerInvoker(layerKey)
  const textContent = layerGraph?.getContent?.()
  // const textContent = layerInvoker('content')?.value
  // const styleAttributes = layerInvoker('styleAttributes')?.value
  // const variableLink = layerInvoker('variableLink')?.value
  // const [variableNode] = useGraph(documentManager, variableLink)
  const cssStyles = layerGraph?.toCss?.() ?? {}
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
