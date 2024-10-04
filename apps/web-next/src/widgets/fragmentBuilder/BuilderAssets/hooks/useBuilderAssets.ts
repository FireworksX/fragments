import { popoutsStore } from '@/shared/store/popouts.store'
import { useBuilderAssetsColors } from '@/shared/hooks/fragmentBuilder/useBuilderAssetsColors'
import { useBuilderAssetsCss } from '@/shared/hooks/fragmentBuilder/useBuilderAssetsCss'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'

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
