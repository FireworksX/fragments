import { FC, useEffect } from 'react'
import { StackPanel } from '../../hooks/useStackCollector'
import Panel from '@/app/builder/widgets/Builder/components/Panel/Panel'
import ControlRow from '@/app/builder/widgets/Builder/components/ControlRow/ControlRow'
import ControlRowWide from '@/app/builder/widgets/Builder/components/ControlRow/components/ControlRowWide/ControlRowWide'
import InputSelect from '@/app/components/InputSelect/InputSelect'
import InputNumber from '@/app/components/InputNumber/InputNumber'
import Stepper from '@/app/components/Stepper/Stepper'
import Select from '@/app/components/Select/Select'
import { useBuilderSelection } from '@/app/builder/widgets/Builder/hooks/useBuilderSelection'
import { useDisplayColor } from '@/app/builder/widgets/Builder/hooks/useDisplayColor'
import { useLayerInvokerNew } from '@/app/builder/widgets/Builder/hooks/useLayerInvokerNew'
import { popoutsStore } from '@/app/stories/popouts.store'
import { builderBorderType, getDefaultBorder } from '@fragments/fragments-plugin'

export interface StackPanelBorderOptions {
  value?: BorderData
  onChange: (border: BorderData) => void
}

interface StackPanelBorderProps extends StackPanel {
  className?: string
}

const StackPanelBorder: FC<StackPanelBorderProps> = ({ className }) => {
  const { selection } = useBuilderSelection()
  const { getColor, getNameColor } = useDisplayColor()
  const layerInvoker = useLayerInvokerNew(selection, ({ node, value, key }) => {
    switch (key) {
      case 'border':
        node.setBorder(value)
        break
    }
  })

  const borderInvoker = layerInvoker('border')

  useEffect(() => {
    if (!borderInvoker.value) {
      borderInvoker.onChange(getDefaultBorder())
    }
  }, [])

  return (
    <Panel className={className}>
      <ControlRow title='Color'>
        <ControlRowWide>
          <InputSelect
            color={getColor(borderInvoker.value?.color)}
            onClick={() =>
              popoutsStore.open('colorPicker', {
                context: {
                  value: borderInvoker.value?.color,
                  onChange: nextColor => borderInvoker.onChange({ color: nextColor })
                }
              })
            }
          >
            {getNameColor(borderInvoker.value?.color)}
          </InputSelect>
        </ControlRowWide>
      </ControlRow>

      <ControlRow title='Width'>
        <InputNumber
          value={borderInvoker?.value?.width}
          min={0}
          onChange={width => borderInvoker.onChange({ width: +width })}
        />
        <Stepper
          value={borderInvoker?.value?.width}
          min={0}
          onChange={width => borderInvoker.onChange({ width: +width })}
        />
      </ControlRow>

      <ControlRow title='Style'>
        <ControlRowWide>
          <Select value={borderInvoker?.value?.type} onChange={type => borderInvoker.onChange({ type })}>
            {Object.keys(builderBorderType).map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </ControlRowWide>
      </ControlRow>
    </Panel>
  )
}

export default StackPanelBorder
