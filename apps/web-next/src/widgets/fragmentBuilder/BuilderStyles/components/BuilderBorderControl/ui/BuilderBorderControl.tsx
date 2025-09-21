import { FC, memo } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputSelect } from '@/shared/ui/InputSelect'
import { definition } from '@fragmentsx/definition'
import { useStack } from '@/shared/hooks/useStack'

interface BuilderBorderControlProps {
  className?: string
}

export const BuilderBorderControl: FC<BuilderBorderControlProps> = memo(({ className }) => {
  const stack = useStack()
  const [borderType, setBorderType, borderTypeInfo] = useLayerValue('borderType')
  const [borderColor, setBorderColor, borderColorInfo] = useLayerValue('borderColor')

  const openBorder = () => {
    stack.open(
      'border',
      {},
      {
        initial: true
      }
    )
  }

  return (
    <ControlRow
      className={className}
      title='Border'
      override={{
        isOverride: borderTypeInfo.isOverride || borderColorInfo.isOverride,
        onRestOverride: borderTypeInfo.resetOverride || borderColorInfo.resetOverride
      }}
    >
      <ControlRowWide>
        <InputSelect
          placeholder='Add...'
          hasIcon={!!borderType && borderType !== definition.borderType.None}
          color={borderColor}
          onReset={() => setBorderType(definition.borderType.None)}
          onClick={openBorder}
        >
          {borderType !== definition.borderType.None ? borderType : ''}
        </InputSelect>
      </ControlRowWide>
    </ControlRow>
  )
})
