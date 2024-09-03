import { useBuilderAssetsColors } from './useBuilderAssetsColors'
import { useBuilderAssetsCss } from './useBuilderAssetsCss'
import { popoutsStore } from '@/app/store/popouts.store'
import { useBuilderSelection } from '@/builder/hooks/useBuilderSelection'

export const useBuilderAssets = () => {
  const { selection, selectionGraph } = useBuilderSelection()
  const { editColor, createColor, colorVariables, removeColor } = useBuilderAssetsColors()
  const { cssVariables, createCssOverride, editCssOverride } = useBuilderAssetsCss()

  const insertComponent = component => {
    selectionGraph.appendChild(component.createInstance())
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
      createCssOverride({ onSubmit: popoutsStore.close, initial: true })
    }
  }
}
