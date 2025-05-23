import { FC } from 'react'
import { InputNumber } from '@/shared/ui/InputNumber'
import { ControlRow } from '@/shared/ui/ControlRow'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'

interface BuilderSizePositionControlProps {
  className?: string
}

export const BuilderSizePositionControl: FC<BuilderSizePositionControlProps> = ({ className }) => {
  const [_top, setTop, topInfo] = useLayerValue('top')
  const [_left, setLeft, leftInfo] = useLayerValue('left')

  return (
    <ControlRow
      className={className}
      title='Position'
      override={{
        isOverride: topInfo.isOverride || topInfo.isOverride,
        onRestOverride: () => {
          topInfo.resetOverride()
          leftInfo.resetOverride()
        }
      }}
    >
      <InputNumber suffix='x' value={leftInfo.value$} min={Infinity} max={Infinity} onChange={setLeft} />
      <InputNumber suffix='y' value={topInfo.value$} min={Infinity} max={Infinity} onChange={setTop} />
    </ControlRow>
  )
}
