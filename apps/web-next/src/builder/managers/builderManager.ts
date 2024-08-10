import { createState, GraphState } from '@graph-state/core'
import { SpringValue } from '@react-spring/web'
import { isInstanceOf } from '@graph-state/checkers'

export type BuilderManager = GraphState

export const createBuilderManager = () =>
  createState({
    initialState: {},
    skip: [isInstanceOf(SpringValue)]
  })
