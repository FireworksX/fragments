import { useBuilderAssetsColors } from './useBuilderAssetsColors'
import { useBuilderAssetsCss } from './useBuilderAssetsCss'
import { useBuilderAssetsComponents } from './useBuilderAssetsComponents'
import { useStore } from '@nanostores/react'
import { useBuilderSelection } from '@/app/builder/widgets/Builder/hooks/useBuilderSelection'
import { popoutsStore } from '@/app/store/popouts.store'
import { useContext } from 'react'
import { BuilderContext } from '@/app/builder/widgets/Builder/BuilderContext'

export const useBuilderAssets = () => {
  const { selection, selectionGraph } = useBuilderSelection()
  const { editColor, createColor, colorVariables, removeColor } = useBuilderAssetsColors()
  const { cssVariables, createCssOverride, editCssOverride } = useBuilderAssetsCss()
  const { list: componentsList, add: addComponent, open: openComponent } = useBuilderAssetsComponents()

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
    },
    components: {
      list: componentsList,
      canInsert: !!selection,
      add: addComponent,
      click: openComponent,
      insert: insertComponent
    }
  }
}
