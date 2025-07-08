import { useEffect, useState } from 'react'

export const useFragmentPreviewSandbox = (initialProps: unknown = {}, onChangeProps?: () => void) => {
  const [props, setProps] = useState(initialProps)

  useEffect(() => {
    onChangeProps?.(props)
  }, [props])

  return {
    props,
    setProps
  }
}
