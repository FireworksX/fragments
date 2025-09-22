import { useBuilderAssetsColors } from '@/shared/hooks/fragmentBuilder/useBuilderAssetsColors'
import { useBuilderAssetsCss } from '@/shared/hooks/fragmentBuilder/useBuilderAssetsCss'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'

export const useBuilderAssets = () => {
  const { editColor, createColor, colorVariables, removeColor } = useBuilderAssetsColors()
  const { cssVariables, createCssOverride, editCssOverride } = useBuilderAssetsCss()

  const insertComponent = component => {
    // selectionGraph.appendChild(component.createInstance())
  }

  return {
    editColor,
    createColor: () => {
      createColor({ initial: true })
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
