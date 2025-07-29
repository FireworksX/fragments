import { ElementType, FC, PropsWithChildren } from 'react'
import { definition } from '@fragmentsx/definition'
import EventIcon from '@/shared/icons/next/zap.svg'
import NumberIcon from '@/shared/icons/next/hash.svg'
import StringIcon from '@/shared/icons/next/type.svg'
import ToggleIcon from '@/shared/icons/next/toggle-left.svg'
import ObjectIcon from '@/shared/icons/next/braces.svg'
import ArrayIcon from '@/shared/icons/next/brackets.svg'
import ColorIcon from '@/shared/icons/next/color.svg'

interface PropertyIconProps {
  type: keyof typeof definition.variableType
  className?: string
}

export const PropertyIcon: FC<PropertyIconProps> = ({ className, type }) => {
  const Icon = (
    {
      Event: EventIcon,
      Number: NumberIcon,
      String: StringIcon,
      Boolean: ToggleIcon,
      Object: ObjectIcon,
      Color: ColorIcon,
      Array: ArrayIcon
    } as Record<keyof typeof definition.variableType, ElementType>
  )[type]

  if (!Icon) {
    return null
  }

  return <Icon className={className}></Icon>
}
