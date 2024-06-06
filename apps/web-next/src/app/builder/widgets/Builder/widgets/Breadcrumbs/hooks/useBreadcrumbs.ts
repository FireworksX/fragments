import { useContext } from 'react'
import { BuilderContext } from '@/app/builder/widgets/Builder/BuilderContext'
import { useGraph } from '@graph-state/react'

export const useBreadcrumbs = () => {
  const { graphState } = useContext(BuilderContext)
  const [componentValue] = useGraph(graphState, graphState.resolve().focusComponent ?? 'nil')

  return {
    list: [
      {
        label: 'Template',
        onClick: () => {
          graphState.setView('default')
          graphState.focusComponent(null)
        }
      },
      { label: componentValue?.name, isComponent: true, onClick: () => undefined }
    ]
  }
}
