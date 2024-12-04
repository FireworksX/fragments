import { useEditor, Editor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import { createContext, FC, PropsWithChildren } from 'react'
import { TextStyle } from '@tiptap/extension-text-style'
import TextAlign from '@tiptap/extension-text-align'
import { FontSize } from './FontSizeExtension'
import { FontWeight } from './FontWeightExtenstion'
import { TextTransform } from './TextTransformExtension'
import { TextDecoration } from './TextDecorationExtension'
import { LineHeight } from './LineHeightExtension'
import { LetterSpacing } from './LetterSpacingExtension'

export const canvasEditorExtensions = [
  StarterKit,
  TextStyle,
  FontSize,
  FontWeight,
  TextAlign.configure({
    types: ['heading', 'paragraph']
  }),
  TextTransform,
  TextDecoration,
  LineHeight,
  LetterSpacing,
  Color
]
const content = ''

export const CanvasTextEditorContext = createContext<Editor>(null as any as Editor)

export const CanvasTextEditorProvider: FC<PropsWithChildren> = ({ children }) => {
  const editor = useEditor({
    extensions: canvasEditorExtensions,
    content
  })

  return <CanvasTextEditorContext.Provider value={editor}>{children}</CanvasTextEditorContext.Provider>
}
