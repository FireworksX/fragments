import { useBuilderAssetsColors } from './useBuilderAssetsColors'
import { useBuilderAssetsCss } from './useBuilderAssetsCss'
import { useBuilderAssetsComponents } from './useBuilderAssetsComponents'
import { useStore } from '@nanostores/react'
import { useBuilderSelection } from '@/app/builder/widgets/Builder/hooks/useBuilderSelection'
import { popoutsStore } from '@/app/stories/popouts.store'

export const useBuilderAssets = () => {
  const statex = {} //useStore($statex)
  const { selection } = useBuilderSelection()
  const { activeLayerField } = {} //useStore($layers)
  const { editColor, createColor, colorVariables, removeColor } = useBuilderAssetsColors()
  const { cssVariables, createCssOverride, editCssOverride } = useBuilderAssetsCss()
  const { list: componentsList, add: addComponent, open: openComponent } = useBuilderAssetsComponents()

  const insertComponent = component => {
    const selectionNode = statex.resolve?.(selection)
    selectionNode.appendChild(component.createInstance())
  }

  return {
    editColor,
    createColor: () => {
      createColor({ onSubmit: popoutsStore.close, initial: true })
    },
    colorVariables,
    removeColor,
    cssVariables,
    editCssOverride,
    createCssOverride: () => {
      // createCssOverride({ onSubmit: $closePopout, initial: true })
    },
    components: {
      list: componentsList,
      canInsert: !!activeLayerField,
      add: addComponent,
      click: openComponent,
      insert: insertComponent
    }
  }
}
