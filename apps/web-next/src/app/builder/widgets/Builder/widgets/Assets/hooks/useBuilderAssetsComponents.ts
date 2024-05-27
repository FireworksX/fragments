import { useStore } from '@nanostores/react'
import { builderNodes } from 'src/data/promos/creators'
import { useCallback, useContext } from 'react'
import { useBuilderSelection } from '@/app/builder/widgets/Builder/hooks/useBuilderSelection'

export const useBuilderAssetsComponents = () => {
  // const { open, close } = useContext(ModalContext)
  const statex = {} //useStore($statex)
  const componentKeys = [] //useFields(statex, builderNodes.Component)
  const values = [] //useStatexStack(statex, componentKeys)
  const { select } = useBuilderSelection()

  const addComponent = () => {
    open('createComponent', {
      onCreate: name => {
        statex.createComponent({ name })
        close()
      }
    })
  }

  const openComponent = useCallback((componentKey: string) => {
    // $layers.setKey('openLayerField', componentKey)
    // select(statex.resolve(componentKey).defaultVariant)
  }, [])

  return {
    list: values ?? [],
    add: addComponent,
    open: openComponent
  }
}
