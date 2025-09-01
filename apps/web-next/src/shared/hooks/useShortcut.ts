import { useEffect, useState } from 'react'
import { SHORTCUTS } from '@/shared/constants/shortcuts'

// TODO в будущем нужно сделать через SSR
export function useUserAgent() {
  const [userAgent, setUserAgent] = useState('')
  const [isMac, setIsMac] = useState(false)
  const [isWindows, setIsWindows] = useState(false)

  useEffect(() => {
    const ua = navigator.userAgent
    setUserAgent(ua)
    setIsMac(/macintosh|mac os x/i.test(ua))
    setIsWindows(/win64|windows|win32/i.test(ua))
  }, [])

  return { userAgent, isMac, isWindows }
}

export const useShortcut = () => {
  const { isWindows } = useUserAgent()

  const base = {
    [SHORTCUTS.remove]: {
      default: '⌫'
    },
    [SHORTCUTS.duplicate]: {
      macos: '⌘D',
      windows: 'CTRL+D'
    },
    [SHORTCUTS.toggleVisible]: {
      macos: '⌘;',
      windows: 'CTRL+;'
    },
    [SHORTCUTS.wrapFrame]: {
      macos: '⌘↵',
      windows: 'CTRL+↵'
    },
    [SHORTCUTS.removeFrame]: {
      macos: '⌘⌫',
      windows: 'CTRL+⌫'
    }
  }

  return Object.fromEntries(
    Object.entries(base).map(([key, value]) => [
      key,
      isWindows ? value?.windows ?? value?.default : value.macos ?? value.default
    ])
  )
}
