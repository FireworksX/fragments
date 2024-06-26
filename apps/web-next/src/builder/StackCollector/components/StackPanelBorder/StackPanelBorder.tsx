import { FC, useContext, useEffect } from 'react'
import { StackPanel } from '../../hooks/useStackCollector'
import InputSelect from '@/app/components/InputSelect/InputSelect'
import InputNumber from '@/app/components/InputNumber/InputNumber'
import Stepper from '@/app/components/Stepper/Stepper'
import Select from '@/app/components/Select/Select'
import { popoutsStore } from '@/app/store/popouts.store'
import { builderBorderType, getDefaultBorder } from '@fragments/fragments-plugin/performance'
import { useLayerInvoker } from '@/builder/hooks/useLayerInvoker'
import { useBuilderSelection } from '@/builder/hooks/useBuilderSelection'
import { useDisplayColor } from '@/builder/hooks/useDisplayColor'
import Panel from '@/builder/components/Panel/Panel'
import ControlRow from '@/builder/components/ControlRow/ControlRow'
import ControlRowWide from '@/builder/components/ControlRow/components/ControlRowWide/ControlRowWide'
import { BuilderContext } from '@/builder/BuilderContext'

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
  const layerInvoker = useLayerInvoker(selection, ({ node, value, key }) => {
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

  console.log(borderInvoker.value?.color)

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
