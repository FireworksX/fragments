import { createContext, FC, PropsWithChildren, useMemo, useRef, useState } from 'react'
import { createState } from '@graph-state/core'

const createToastStore = () =>
  createState({
    _type: 'ToastsStore',
    initialState: {
      isOpen: false,
      variant: null,
      context: null
    },
    plugins: [
      state => {
        state.open = variant => {
          state.mutate(state.key, {
            isOpen: true,
            variant,
            context: null
          })
        }

        state.close = () => {
          state.mutate(state.key, {
            isOpen: false
          })
        }

        state.setContext = context => {
          state.mutate(state.key, {
            context
          })
        }
      }
    ]
  })

export const ToastContext = createContext<ReturnType<typeof createToastStore> | null>(null)

export const ToastProvider: FC<PropsWithChildren> = ({ children }) => {
  const store = useRef(createToastStore())

  return <ToastContext value={store.current}>{children}</ToastContext>
}
