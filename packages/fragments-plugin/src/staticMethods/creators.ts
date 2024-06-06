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
    const node = createFrameNode()
    const documentNode = state.resolve(state.root)
    documentNode.appendChild(node)
    return state.keyOfEntity(node)
  }

  const createComponent = (options: CreateComponentOptions) => {
    const node = createComponentNode(options)
    const documentNode = state.resolve(state.root)
    documentNode.appendChild(node)
    return state.keyOfEntity(node)
  }

  const createText = () => {
    const entity = createTextNode()
    state.mutate(state.root, {
      children: [entity]
    })

    return state.keyOfEntity(entity)
  }

  const createScreen = (createScreenOptions: CreateScreenOptions) => {
    const node = createScreenNode(createScreenOptions)
    const documentNode = state.resolve(state.root)
    documentNode.appendChild(node)
    return state.keyOfEntity(node)
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
      const entity = createCssLinkNode(options)
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
