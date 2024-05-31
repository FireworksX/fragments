import { useContext } from 'react'
import { BuilderContext } from '@/app/builder/widgets/Builder/BuilderContext'
import { useGraphFields, useGraphStack } from '@graph-state/react'
import { builderNodes } from '@fragments/fragments-plugin'
import { popoutsStore } from '@/app/stories/popouts.store'

type ExtendOptions = Partial<OpenPopoutOptions<'cssOverride'>>

export interface BuilderAssetsCssOverrideOptions extends ExtendOptions {
  onSubmit?: (cssOverrideVariable: Variable<string, StackPanelCssOverrideNew>) => void
}

export const useBuilderAssetsCss = () => {
  const { graphState } = useContext(BuilderContext)
  const fields = useGraphFields(graphState, builderNodes.CssLink)
  const values = useGraphStack(graphState, fields)

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
          const cssLink = graphState.createCssLink(override)
          optionsOnSubmit && optionsOnSubmit(cssLink)
        }
      },
      position: 'left',
      ...popoutOptions
    })
  }

  const removeCssOverride = (key: EntityKey) => {
    graphState?.invalidate(key)
  }

  return {
    cssVariables: values,
    createCssOverride,
    editCssOverride,
    removeCssOverride
  }
}
