import { LinkKey } from '@graph-state/core'
import isBrowser from '@/app/utils/isBrowser'

export const findRefNode = (nodeLink: LinkKey) => isBrowser && document.querySelector(`[data-key="${nodeLink}"]`)
