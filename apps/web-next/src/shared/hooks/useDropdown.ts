import { useRef } from 'react'
import { Instance } from '@/app/components/Popover/Popover'

export const useDropdown = () => {
  const ref = useRef<Instance | null>(null)

  return {
    ref,
    show: () => {
      if (ref.current) {
        ref.current?.show()
      }
    },
    hide: () => {
      if (ref.current) {
        ref.current?.hide()
      }
    }
  }
}
