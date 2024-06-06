import { useCallback, useContext } from 'react'
import { useBuilderSelection } from '@/app/builder/widgets/Builder/hooks/useBuilderSelection'
import { modalStore } from '@/app/store/modal.store'
import { BuilderContext } from '@/app/builder/widgets/Builder/BuilderContext'
import { useGraphFields, useGraphStack } from '@graph-state/react'
import { builderNodes } from '@fragments/fragments-plugin'

export const useBuilderAssetsComponents = () => {
  const { graphState } = useContext(BuilderContext)
  const componentKeys = useGraphFields(graphState, builderNodes.Component)
  const values = useGraphStack(graphState, componentKeys)
  const { select } = useBuilderSelection()

  const addComponent = () => {
    modalStore.open('createComponent', {
      onCreate: name => {
        const componentLink = graphState.createComponent({ name })
        graphState.resolve(componentLink).addVariant()
        modalStore.close()
      }
    })
  }

  const openComponent = useCallback((componentKey: string) => {
    graphState.setView('component')
    graphState.focusComponent(componentKey)
    select(graphState.resolve(componentKey).defaultVariant)
  }, [])

  return {
    list: values ?? [],
    add: addComponent,
    open: openComponent
  }
}
