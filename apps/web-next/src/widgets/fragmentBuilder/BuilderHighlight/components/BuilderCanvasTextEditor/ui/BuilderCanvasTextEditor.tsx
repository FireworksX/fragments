import React, { FC, useContext } from 'react'
import { EditorContent } from '@tiptap/react'
import { CanvasTextEditorContext } from '@/widgets/fragmentBuilder/BuilderHighlight'
import './styles.css'

interface BuilderFloatBarProps {
  className?: string
}

export const BuilderCanvasTextEditor: FC<BuilderFloatBarProps> = ({ className }) => {
  const editor = useContext(CanvasTextEditorContext)

  return (
    <div
      className='canvas-rich-editor'
      onClickCapture={e => {
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      <EditorContent editor={editor} />
    </div>
  )
}
