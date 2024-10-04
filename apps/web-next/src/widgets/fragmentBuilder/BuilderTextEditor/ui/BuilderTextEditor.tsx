import { FC, useEffect } from 'react'
import cn from 'classnames'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { animated, to } from '@react-spring/web'
import styles from './styles.module.css'
import { useBuilderTextEditor } from '../hooks/useBuilderTextEditor'
import { AnimatedVisible } from '@/shared/ui/AnimatedVisible'

interface BuilderTextEditorProps {
  className?: string
}

const ClearOnUnmount = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return () => {
      editor.update(() => {})
    }
  }, [editor])
}

export const BuilderTextEditor: FC<BuilderTextEditorProps> = ({ className }) => {
  const { editorStyles, isTextEditing } = useBuilderTextEditor()

  return (
    <>
      <AnimatedVisible visible={isTextEditing}>
        <animated.div className={cn(styles.root, className)} data-testid='BuilderTextEditor' style={editorStyles}>
          <RichTextPlugin
            contentEditable={<ContentEditable className={styles.contentEditable} />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
        </animated.div>
      </AnimatedVisible>
    </>
  )
}
