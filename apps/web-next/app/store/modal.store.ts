import { createState, GraphState } from '@graph-state/core'
import { CreateComponentContext } from '@/app/widgets/modals/CreateComponentModal/CreateComponentModal'
import { CreateCustomBreakpointContext } from '@/app/widgets/modals/CreateCustomBreakpoint/CreateCustomBreakpoint'
import loggerPlugin from '@graph-state/plugin-logger'
import isBrowser from '@/app/utils/isBrowser'
import { CreateProjectModalContext } from '@/app/widgets/modals/CreateProjectModal/CreateProjectModal'
import { CreateFragmentModalContext } from '@/app/widgets/modals/CreateFragmentModal/CreateFragmentModal'

export type ModalPanelMap = {
  createComponent: CreateComponentContext
  createCustomBreakpoint: CreateCustomBreakpointContext
  createProject: CreateProjectModalContext
  createFragment: CreateFragmentModalContext
  aboutTemplate: unknown
  createLanding: unknown
  componentVariables: unknown
}

export const MODAL_TYPE = 'Modal'

interface ModalStore extends GraphState {
  open<TName extends keyof ModalPanelMap>(name: TName, context: ModalPanelMap[TName]): void
  close(): void
}

export const modalStore = createState({
  initialState: {
    name: null,
    context: null
  },
  plugins: [
    loggerPlugin({ onlyBrowser: true }),
    graphState => {
      graphState.open = <TName extends keyof ModalPanelMap>(name: TName, context: ModalPanelMap[TName]) => {
        graphState.mutate({
          name,
          context
        })
      }

      graphState.close = () => {
        graphState.mutate({
          name: null,
          context: null
        })
      }

      return graphState
    }
  ]
}) as ModalStore

if (isBrowser) {
  window.modalStore = modalStore

  modalStore.subscribe(modalStore, console.log)
}
