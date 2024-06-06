import { FC, useEffect, useRef } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import * as Styled from './styles.module.css'
import { createEditor, Descendant } from 'slate'
import { ReactEditor, Slate, withReact } from 'slate-react'
import TextEditorInner from './components/TextEditorInner/TextEditorInner'

interface RichTextEditorProps {
  className?: string
}

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'Try it out for yourself!' }]
  }
]

const RichTextEditor: FC<RichTextEditorProps> = ({ className }) => {
  return (
    <div className={cn(styles.root, className)}>
      <TextEditorInner />
    </div>
  )
}

interface RichTextEditorContainerProps extends RichTextEditorProps {
  value?: Descendant[]
  onMount?(editor: ReactEditor): void
}

const RichTextEditorContainer: FC<RichTextEditorContainerProps> = ({ value, onMount, ...editorProps }) => {
  const editorRef = useRef<ReactEditor>()
  if (!editorRef.current) editorRef.current = withReact(createEditor())
  const editor = editorRef.current

  useEffect(() => {
    onMount?.(editor)
  }, [editor, onMount])

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <RichTextEditor {...editorProps} />
    </Slate>
  )
}

export default RichTextEditorContainer
