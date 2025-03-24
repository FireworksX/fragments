import { useState } from 'react'

export const useFragmentPreviewSandbox = () => {
  const [props, setProps] = useState({})

  return {
    props,
    setProps
  }
}
