import { createContext, FC, PropsWithChildren, useCallback, useState } from 'react'
import { CreateCustomBreakpointContext } from '../../widgets/modals/CreateCustomBreakpoint/CreateCustomBreakpoint'
import { CreateComponentContext } from '../../widgets/modals/CreateComponentModal/CreateComponentModal'

type ModalProviderProps = PropsWithChildren

export type PopoutPanelMap = {
  createComponent: CreateComponentContext
  createCustomBreakpoint: CreateCustomBreakpointContext
  aboutTemplate: unknown
  createLanding: unknown
  componentVariables: unknown
}

interface ModalContextValue {
  name?: keyof PopoutPanelMap
  context?: PopoutPanelMap[keyof PopoutPanelMap]
  open: <TName extends keyof PopoutPanelMap>(name: TName, payload?: PopoutPanelMap[TName], isInitial?: boolean) => void
  updateContext: <TName extends keyof PopoutPanelMap>(name: TName, payload: Partial<PopoutPanelMap[TName]>) => void
  close: () => void
}

const initialState: ModalContextValue = {
  name: undefined,
  setState: () => undefined
}

export const ModalContext = createContext<ModalContextValue>(initialState)

export const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [state, setState] = useState(initialState)

  const close = useCallback(() => {
    setState({
      name: undefined,
      context: undefined
    })
  }, [setState])

  const open = useCallback(<TName extends keyof PopoutPanelMap>(name: TName, context: PopoutPanelMap[TName]) => {
    setState({ name, context })
  }, [])

  const updateContext = useCallback(
    <TName extends Exclude<keyof PopoutPanelMap, symbol | number>>(
      name: TName,
      context: Partial<PopoutPanelMap[TName]>
    ) =>
      setState(prev => ({
        name,
        context: {
          ...prev.context,
          ...context
        }
      })),
    [setState]
  )

  const resultState = {
    ...state,
    open,
    close,
    updateContext
  }

  return <ModalContext.Provider value={resultState}>{children}</ModalContext.Provider>
}
