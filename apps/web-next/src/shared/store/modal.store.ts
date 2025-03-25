import { createState, GraphState } from '@graph-state/core'
import loggerPlugin from '@graph-state/plugin-logger'

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
    state => {
      state.open = <TName extends keyof ModalPanelMap>(name: TName, context: ModalPanelMap[TName]) => {
        state.mutate({
          name,
          context
        })
      }

      state.close = () => {
        state.mutate({
          name: null,
          context: null
        })
      }

      state.updateContext = context => {
        state.mutate({
          context
        })
      }

      return state
    }
  ]
}) as ModalStore
