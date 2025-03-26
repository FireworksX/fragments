import { FC, useContext, useEffect } from 'react'
import { popoutsStore } from '@/shared/store/popouts.store'
import { isObject, objectToColorString, omit } from '@fragments/utils'
import { isLinkKey } from '@graph-state/core'
import { definition } from '@fragments/definition'
import { useDisplayColor } from '@/shared/hooks/fragmentBuilder/useDisplayColor'
import { animatableValue } from '@/shared/utils/animatableValue'
import { Panel } from '@/shared/ui/Panel'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputSelect } from '@/shared/ui/InputSelect'
import { InputNumber } from '@/shared/ui/InputNumber'
import { Stepper } from '@/shared/ui/Stepper'
import { Select } from '@/shared/ui/Select'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { getRandomColor } from '@/shared/utils/random'
import { popoutNames } from '@/shared/data'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'

export interface StackPanelBorderOptions {
  value?: BorderData
  onChange: (border: BorderData) => void
}

interface StackPanelBorderProps extends StackPanel {
  className?: string
}

const StackPanelBorder: FC<StackPanelBorderProps> = ({ className }) => {
  const [borderType, setBorderType] = useLayerValue('borderType')
  const [borderColor, setBorderColor] = useLayerValue('borderColor')
  const [borderWidth, setBorderWidth] = useLayerValue('borderWidth')

  useEffect(() => {
    if (borderType === definition.borderType.None) {
      setBorderType(definition.borderType.Solid)
    }
  }, [])

  return (
    <Panel className={className}>
      <ControlRow title='Color'>
        <ControlRowWide>
          <InputSelect
            color={borderColor}
            onClick={() =>
              popoutsStore.open(popoutNames.colorPicker, {
                context: {
                  value: borderColor,
                  onChange: nextColor => {
                    setBorderColor(objectToColorString(nextColor))
                  }
                }
              })
            }
          >
            {borderColor}
          </InputSelect>
        </ControlRowWide>
      </ControlRow>

      <ControlRow title='Width'>
        <InputNumber value={borderWidth} min={0} onChange={width => setBorderWidth(+width)} />
        <Stepper value={borderWidth} min={0} onChange={width => setBorderWidth(+width)} />
      </ControlRow>

      <ControlRow title='Style'>
        <ControlRowWide>
          <Select value={borderType} onChange={type => setBorderType(type)}>
            {Object.keys(omit(definition.borderType, definition.borderType.None)).map(type => (
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
