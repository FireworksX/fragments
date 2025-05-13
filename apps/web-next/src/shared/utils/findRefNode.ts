import { LinkKey } from '@graph-state/core'
import { isBrowser } from '@fragmentsx/utils'

export const findRefNode = (nodeLink: LinkKey) => isBrowser && document.querySelector(`[data-key="${nodeLink}"]`)
