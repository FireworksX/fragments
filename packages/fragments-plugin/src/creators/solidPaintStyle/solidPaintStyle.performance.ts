import { Color } from 'src/types/props'
import { builderNodes } from 'src/defenitions'
import { Entity, GraphState } from '@graph-state/core'
import { generateId } from '@fragments/utils'

export interface CreateSolidPaintStyleOptions {
  color: Color
  name: string
}

export const createSolidPaintStyle = (state: GraphState, { color, name }: CreateSolidPaintStyleOptions): Entity => ({
  _type: builderNodes.SolidPaintStyle,
  _id: generateId(),
  color,
  name,
  update(color: Color) {
    const currentColor = state.resolve(this).color

    if (currentColor) {
      Object.entries(color).forEach(([key, value]) => {
        if (key in currentColor) {
          currentColor[key].start(value)
        }
      })
    }
  }
})
