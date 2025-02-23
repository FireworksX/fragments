import { FC } from 'react'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { ControlRow } from '@/shared/ui/ControlRow'
import { InputNumber } from '@/shared/ui/InputNumber'
import { Stepper } from '@/shared/ui/Stepper'

interface BuilderZIndexControlProps {
  className?: string
}

export const BuilderZIndexControl: FC<BuilderZIndexControlProps> = ({ className }) => {
  const [value, setValue, valueInfo] = useLayerValue('zIndex')

  return (
    <ControlRow
      className={className}
      title='Opacity'
      override={{
        isOverride: valueInfo.isOverride,
        onRestOverride: valueInfo.resetOverride
      }}
    >
      <InputNumber value={value} onChange={setValue} />
      <Stepper value={value} onChange={setValue} />
    </ControlRow>
  )
}
