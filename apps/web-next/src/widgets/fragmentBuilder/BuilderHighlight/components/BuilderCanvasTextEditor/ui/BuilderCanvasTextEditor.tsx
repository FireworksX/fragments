import React, { FC, useContext } from 'react'
import { EditorContent } from '@tiptap/react'
import { definition } from '@fragmentsx/definition'
import { CanvasTextEditorContext } from '@/widgets/fragmentBuilder/BuilderHighlight'
import './styles.css'
import { useFragmentProperties } from '@/shared/hooks/fragmentBuilder/useFragmentProperties'
import cn from 'classnames'
import { getCssVariables } from '@fragmentsx/render-core'
import { keyOfEntity } from '@graph-state/core'
import { useBuilderAssetsColors } from '@/shared/hooks/fragmentBuilder/useBuilderAssetsColors'

interface BuilderFloatBarProps {
  className?: string
}

export const BuilderCanvasTextEditor: FC<BuilderFloatBarProps> = ({ className }) => {
  const editor = useContext(CanvasTextEditorContext)
  const { properties } = useFragmentProperties()
  const { propertiesMap } = useBuilderAssetsColors()
  const colorVariables = properties
    ?.filter(prop => prop.type === definition.variableType.Color)
    .reduce((acc, prop) => {
      acc[prop._id] = prop?.defaultValue

      return acc
    }, {})
  const cssVariables = getCssVariables(colorVariables)
  const projectCssVariables = getCssVariables(propertiesMap)

  return (
    <div
      className={cn('canvas-rich-editor', className)}
      style={{
        ...cssVariables,
        ...projectCssVariables
      }}
      onClickCapture={e => {
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      <EditorContent editor={editor} />
    </div>
  )
}
