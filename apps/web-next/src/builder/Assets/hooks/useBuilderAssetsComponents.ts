import { useCallback, useContext } from 'react'
import { modalStore } from '@/app/store/modal.store'
import { useGraphFields, useGraphStack } from '@graph-state/react'
import { builderNodes } from '@fragments/fragments-plugin'
import { BuilderContext } from '@/builder/BuilderContext'
import { useBuilderSelection } from '@/builder/hooks/useBuilderSelection'

export const useBuilderAssetsComponents = () => {
  const { documentManager } = useContext(BuilderContext)
  const componentKeys = useGraphFields(documentManager, builderNodes.Component)
  const values = useGraphStack(documentManager, componentKeys)
  const { select } = useBuilderSelection()

  const addComponent = () => {
    modalStore.open('createComponent', {
      onCreate: name => {
        const componentLink = documentManager.createComponent({ name })
        documentManager.resolve(componentLink).addVariant()
        modalStore.close()
      }
    })
  }

  const openComponent = useCallback((componentKey: string) => {
    documentManager.setView('component')
    documentManager.focusComponent(componentKey)
    select(documentManager.resolve(componentKey).defaultVariant)
  }, [])

  return {
    list: values ?? [],
    add: addComponent,
    open: openComponent
  }
}
