import { createState, LinkKey } from '@graph-state/core'
import pluginFragmentSpring, { skips, skips as stateSkips } from '@fragments/plugin-fragment-spring'
import loggerPlugin from '@graph-state/plugin-logger'

interface FragmentModuleOptions {
  name: string
  fragmentLink: LinkKey
}

export const createFragmentModule = ({ name, fragmentLink }: FragmentModuleOptions) => {
  return createState({
    initialState: {
      name
    },
    plugins: [pluginFragmentSpring(fragmentLink), loggerPlugin({ onlyBrowser: true })],
    skip: [...stateSkips, ...skips]
  })
}
