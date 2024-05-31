import { Color } from '../../types/props'
import { builderNodes } from '../defenitions'
import { generateId } from '../helpers'
import { Entity } from '@graph-state/core'

export interface CreateSolidPaintStyleOptions {
  color: Color
  name: string
}

export const createSolidPaintStyle = ({ color, name }: CreateSolidPaintStyleOptions): Entity => ({
  _type: builderNodes.SolidPaintStyle,
  _id: generateId(),
  color,
  name
})
