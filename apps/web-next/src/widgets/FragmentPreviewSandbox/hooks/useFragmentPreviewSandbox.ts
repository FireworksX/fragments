import { useEffect, useState } from 'react'
import { omit } from '@fragmentsx/utils'

export const useFragmentPreviewSandbox = (initialProps: unknown = {}, onChangeProps?: () => void) => {
  const [props, setProps] = useState(() => omit(initialProps, '_type', '_id'))

  useEffect(() => {
    onChangeProps?.(props)
  }, [props])

  return {
    props,
    setProps
  }
}
