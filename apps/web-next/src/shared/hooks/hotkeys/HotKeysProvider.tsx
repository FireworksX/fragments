import { FC, PropsWithChildren } from 'react'
import { HotkeysProvider } from 'react-hotkeys-hook'
import { createConstants } from '@fragmentsx/utils'

export const hotKeysScope = createConstants('builder')

interface HotKeysProviderProps extends PropsWithChildren {}

export const HotKeysProvider: FC<HotKeysProviderProps> = ({ children }) => {
  return <HotkeysProvider>{children}</HotkeysProvider>
}
