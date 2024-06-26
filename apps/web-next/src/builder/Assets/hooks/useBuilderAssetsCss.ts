import { useContext } from 'react'
import { useGraphFields, useGraphStack } from '@graph-state/react'
import { popoutsStore } from '@/app/store/popouts.store'
import { BuilderContext } from '@/builder/BuilderContext'
import { builderNodes } from '@fragments/fragments-plugin'

type ExtendOptions = Partial<OpenPopoutOptions<'cssOverride'>>

export interface BuilderAssetsCssOverrideOptions extends ExtendOptions {
  onSubmit?: (cssOverrideVariable: Variable<string, StackPanelCssOverrideNew>) => void
}

export const useBuilderAssetsCss = () => {
  const { documentManager } = useContext(BuilderContext)
  const fields = useGraphFields(documentManager, builderNodes.CssLink)
  const values = useGraphStack(documentManager, fields)

  const editCssOverride = (variableKey: EntityKey, options?: ExtendOptions) => {
    if (variableKey && graphState) {
      const variableValue = graphState.resolve(variableKey)

      // $openPopout('cssOverride', {
      //   position: 'left',
      //   context: {
      //     name: variableValue.name,
      //     value: variableValue.cssText,
      //     submitButtonLabel: 'Update',
      //     onSubmit: override => {
      //       statex.mutate(variableKey, override)
      //       $closePopout()
      //     }
      //   },
      //   ...options
      // })
    }
  }

  const createCssOverride = ({ onSubmit: optionsOnSubmit, ...popoutOptions }: BuilderAssetsCssOverrideOptions) => {
    popoutsStore.open('cssOverride', {
      context: {
        name: '',
        onSubmit: override => {
          const cssLink = documentManager.createCssLink(override)
          optionsOnSubmit && optionsOnSubmit(cssLink)
        }
      },
      position: 'left',
      ...popoutOptions
    })
  }

  const removeCssOverride = (key: EntityKey) => {
    documentManager?.invalidate(key)
  }

  return {
    cssVariables: values,
    createCssOverride,
    editCssOverride,
    removeCssOverride
  }
}
