import { Entity, Statex } from '@adstore/statex'
import { Color } from '../../types/props'
import { builderNodes } from '../defenitions'
import { generateId } from '../helpers'

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
