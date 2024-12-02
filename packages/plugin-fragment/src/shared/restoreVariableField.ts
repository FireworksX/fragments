import { Graph, isGraph, LinkKey } from '@graph-state/core'

const updateTarget = (nextTarget, currentTaregt, field) => {
  nextTarget[field] = currentTaregt[`_${field}`]
  nextTarget._type = currentTaregt._type
  nextTarget._id = currentTaregt._id
}

export const restoreVariableField = (targets: Graph[], variableLink: LinkKey, field?: string) => {
  const updateTargets = []

  targets.filter(Boolean).forEach(target => {
    if (isGraph(target)) {
      const nextParent = {}
      if (!!field && field in target) {
        updateTarget(nextParent, target, field)
      } else {
        Object.entries(target).forEach(([key, value]) => {
          if (value === variableLink && `_${key}` in target) {
            updateTarget(nextParent, target, key)
          }
        })
      }

      if (Object.keys(nextParent).length > 0) {
        updateTargets.push(nextParent)
      }
    }
  })

  return updateTargets
}
