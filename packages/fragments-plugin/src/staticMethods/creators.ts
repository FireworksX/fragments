import { Plugin } from '@graph-state/core'
import {
  createFrame as createFrameNode,
  createScreen as createScreenNode,
  CreateScreenOptions,
  createSolidPaintStyle as createSolidPaintStyleNode,
  CreateSolidPaintStyleOptions,
  createText as createTextNode,
  createCssLink as createCssLinkNode
} from 'src/creators'
import { createComponent as createComponentNode, CreateComponentOptions } from '../creators/createComponent'

export const creators: Plugin = state => {
  const createFrame = () => {
    const entity = createFrameNode()
    state.mutate(state.root, {
      children: [entity]
    })

    return state.keyOfEntity(entity)
  }

  const createComponent = (options: CreateComponentOptions) => {
    const componentNode = createComponentNode(options)

    state.mutate(state.root, {
      children: [componentNode]
    })
    state.resolve(componentNode).addVariant()

    return componentNode
  }

  const createText = () => {
    const entity = createTextNode(state)
    return state.mutate(state.root, {
      children: [entity]
    })
  }

  const createScreen = (createScreenOptions: CreateScreenOptions) => {
    const entity = createScreenNode(state, createScreenOptions)
    return state.mutate(state.root, {
      children: [entity]
    })
  }

  const createSolidPaintStyle = (options: CreateSolidPaintStyleOptions) => {
    if (options) {
      const entity = createSolidPaintStyleNode(options)
      return state.mutate(entity)
    }

    return null
  }

  const createCssLink = (options: CreateSolidPaintStyleOptions) => {
    if (options) {
      const entity = createCssLinkNode(state, options)
      return state.mutate(entity)
    }

    return null
  }

  state.createFrame = createFrame
  state.createComponent = createComponent
  state.createText = createText
  state.createScreen = createScreen
  state.createSolidPaintStyle = createSolidPaintStyle
  state.createCssLink = createCssLink

  return state
}
