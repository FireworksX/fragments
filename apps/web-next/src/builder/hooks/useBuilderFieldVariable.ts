import { Field } from 'react-hook-form'
import { capitalize } from '@/app/utils/capitalize'

export type BuilderFieldVariable = ReturnType<ReturnType<typeof useBuilderFieldVariable>>

export const useBuilderFieldVariable = (layer: Field) => {
  const statex = {}
  const builderView = ''
  // const { open } = useContext(ModalContext)
  // const builderView = useStore($builderView)
  // const { openLayerField } = useStore($layers)
  // const statex = useStore($statex)
  const node = null //useStatex(statex, layer)
  const componentNode = null //statex.resolve(openLayerField)
  const componentProperties = [] //(componentNode?.componentPropertyDefinitions ?? []).map(statex.resolve)

  /**
   * initialValue - это значение, которое было на момент создания переменной.
   * Нужно для того, чтобы если сделать reset переменной, то она была равна initialValue
   */
  const createVariable = (key: string, initialValue: unknown) => {
    const nextName = capitalize(key)
    const countOfSameNames = componentProperties.filter(prop => statex.resolve(prop).name.startsWith(nextName)).length
    const basePropertyData = {
      name: countOfSameNames > 0 ? `${nextName} ${countOfSameNames + 1}` : nextName,
      initialValue
    }

    if (componentNode) {
      if (key === 'opacity') {
        const property = statex.createComponentPropertyMap.createNumberProperty(basePropertyData)
        componentNode.addComponentProperty(property)
        // node.setOpacity(keyOfEntity(property))
      }
      if (key === 'visible') {
        const property = statex.createComponentPropertyMap.createBooleanProperty(basePropertyData)
        componentNode.addComponentProperty(property)
        // node.toggleVisible(keyOfEntity(property))
      }
    }

    // open('componentVariables')
  }

  return (key: string, initialValue: unknown) => ({
    hasConnector: builderView === 'component',
    actions:
      builderView === 'component'
        ? [
            {
              label: 'Create variable',
              onClick: () => createVariable(key, initialValue)
            },
            {
              label: 'Set variable',
              disabled: componentProperties.length === 0,
              options: [
                componentProperties.map(prop => ({
                  label: prop.name,
                  onClick: () => alert(1)
                }))
              ]
            }
          ]
        : []
  })
}
