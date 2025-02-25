import { FC, memo } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { InputNumber } from '@/shared/ui/InputNumber'
import { Slider } from '@/shared/ui/Slider'
import { ControlRow } from '@/shared/ui/ControlRow'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useLayerVariables } from '@/shared/hooks/fragmentBuilder/useLayerVariables'

interface BuilderOpacityControlProps {
  className?: string
}

export const BuilderOpacityControl: FC<BuilderOpacityControlProps> = memo(({ className }) => {
  const [opacity, setOpacity, opacityInfo] = useLayerValue('opacity')
  const { disabled, actions, variableLink, resetVariable } = useLayerVariables('opacity')

  return (
    <ControlRow
      className={className}
      title='Opacity'
      hasConnector={!disabled}
      override={{
        isOverride: opacityInfo.isOverride,
        onRestOverride: opacityInfo.resetOverride
      }}
      variable={{
        link: variableLink,
        actions,
        onReset: resetVariable
      }}
    >
      <InputNumber value={opacity} step={0.1} max={1} min={0} onChange={setOpacity} />
      <Slider value={opacity} step={0.1} max={1} min={0} onChange={setOpacity} />
    </ControlRow>
  )
})
