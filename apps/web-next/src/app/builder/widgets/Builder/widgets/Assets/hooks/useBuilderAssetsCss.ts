import { builderNodes } from 'src/data/promos/creators'

type ExtendOptions = Partial<OpenPopoutOptions<'cssOverride'>>

export interface BuilderAssetsCssOverrideOptions extends ExtendOptions {
  onSubmit?: (cssOverrideVariable: Variable<string, StackPanelCssOverrideNew>) => void
}

export const useBuilderAssetsCss = () => {
  const statex = {} //useStore($statex)
  const fields = [] //useFields(statex, builderNodes.CssLink)
  const values = [] //useStatexStack(statex, fields)

  const editCssOverride = (variableKey: EntityKey, options?: ExtendOptions) => {
    if (variableKey && statex) {
      const variableValue = statex.resolve(variableKey)

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
    // $openPopout('cssOverride', {
    //   context: {
    //     name: '',
    //     onSubmit: override => {
    //       const cssLink = statex.createCssLink(override)
    //       optionsOnSubmit && optionsOnSubmit(cssLink)
    //     }
    //   },
    //   position: 'left',
    //   ...popoutOptions
    // })
  }

  const removeCssOverride = (key: EntityKey) => {
    statex?.invalidate(key)
  }

  return {
    cssVariables: values,
    createCssOverride,
    editCssOverride,
    removeCssOverride
  }
}
