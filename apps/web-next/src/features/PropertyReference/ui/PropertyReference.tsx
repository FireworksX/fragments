import { FC } from 'react'
import { PropertyReferenceOverflow } from '../components/PropertyReferenceOverflow'
import { PropertyReferenceLayerDirection } from '../components/PropertyReferenceLayerDirection'
import { PropertyReferenceLayerAlign } from '../components/PropertyReferenceLayerAlign'
import { PropertyReferenceLayerDistribute } from '../components/PropertyReferenceLayerDistribute'
import { PropertyReferenceLayerWrap } from '../components/PropertyReferenceLayerWrap'

interface PropertyReferenceProps {
  type: string
  value: unknown
  onChange: (value: unknown) => void
}

const map = {
  overflow: PropertyReferenceOverflow,
  layerDirection: PropertyReferenceLayerDirection,
  layerAlign: PropertyReferenceLayerAlign,
  layerDistribute: PropertyReferenceLayerDistribute,
  layerWrap: PropertyReferenceLayerWrap
}

export const PropertyReference: FC<PropertyReferenceProps> = ({ type, value, onChange }) => {
  if (type in map) {
    const Node = map?.[type ?? '']

    return <Node value={value} onChange={onChange} />
  }

  return null
}
