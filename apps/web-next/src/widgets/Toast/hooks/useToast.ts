import { useContext } from 'react'
import { ToastContext } from '@/widgets/Toast/providers/ToastContext'
import { useGraph } from '@graph-state/react'
import { noop } from '@fragmentsx/utils'

export const useToast = () => {
  const toastsStore = useContext(ToastContext)
  const [toast] = useGraph(toastsStore, toastsStore?.key)

  return {
    ...toast,
    open: toastsStore?.open ?? noop,
    close: toastsStore?.close ?? noop(),
    setContext: toastsStore?.setContext ?? noop()
  }
}
