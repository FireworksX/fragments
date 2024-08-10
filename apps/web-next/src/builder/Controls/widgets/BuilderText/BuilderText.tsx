import { FC, useContext } from 'react'
import { useBuilderText } from './hooks/useBuilderText'
import ControlRow from '@/builder/components/ControlRow/ControlRow'
import ControlRowWide from '@/builder/components/ControlRow/components/ControlRowWide/ControlRowWide'
import Select from '@/app/components/Select/Select'
import { GraphValue } from '@graph-state/react'
import InputSelect from '@/app/components/InputSelect/InputSelect'
import InputNumber from '@/app/components/InputNumber/InputNumber'
import Stepper from '@/app/components/Stepper/Stepper'
import TabsSelector from '@/app/components/TabsSelector'
import { BuilderContext } from '@/builder/BuilderContext'
import { useDisplayColor } from '@/builder/hooks/useDisplayColor'
import Panel from '@/builder/components/Panel/Panel'
import { builderNodes } from '@fragments/fragments-plugin/performance'
import { useBuilderStyles } from '@/builder/Controls/widgets/BuilderStyles/hooks/useBuilderStyles'
import { useBuilderSelection } from '@/builder/hooks/useBuilderSelection'
import Button from '@/app/components/Button'

interface BuilderTextProps {
  className?: string
}

const BuilderText: FC<BuilderTextProps> = ({ className }) => {
  const { documentManager } = useContext(BuilderContext)
  const { selectionGraph } = useBuilderSelection()
  const { weight, color, align, fontSize, lineHeight, letterSpacing, transform, decoration } = useBuilderText()
  const { getColor, getNameColor } = useDisplayColor()

  if (![builderNodes.Text].some(type => type === selectionGraph?._type)) {
    return null
  }

  return (
    <Panel className={className} title='Text'>
      {/*<BuilderControlRow title='Styles'>*/}
      {/*  <BuilderControlRowWide>*/}
      {/*    <InputSelect icon={<InputSelectTextIcon />}>{colors.secondary}</InputSelect>*/}
      {/*  </BuilderControlRowWide>*/}
      {/*</BuilderControlRow>*/}

      {/*<BuilderControlRow title='Content' onClick={noop}>*/}
      {/*  <BuilderControlRowWide>*/}
      {/*    <InputText value={content.value} onChange={content.onChange} />*/}
      {/*  </BuilderControlRowWide>*/}
      {/*</BuilderControlRow>*/}

      {/*<BuilderControlRow title='Font'>*/}
      {/*  <BuilderControlRowWide>*/}
      {/*    <SelectMimicry onClick={font.onClick}>{font.value}</SelectMimicry>*/}
      {/*  </BuilderControlRowWide>*/}
      {/*</BuilderControlRow>*/}

      <ControlRow title='Weight'>
        <ControlRowWide>
          <Select value={weight.value} onChange={weight.onChange}>
            {weight.items.map(({ label, value }) => (
              <option key={label} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </ControlRowWide>
      </ControlRow>

      <ControlRow title='Color'>
        <ControlRowWide>
          <GraphValue graphState={documentManager} field={color.value}>
            {value => (
              <InputSelect color={getColor(value)} onClick={color.onClick}>
                {getNameColor(value)}
              </InputSelect>
            )}
          </GraphValue>
        </ControlRowWide>
      </ControlRow>

      <ControlRow title='Size'>
        <InputNumber value={fontSize.value} min={0} onChange={fontSize.onChange} />
        <Stepper value={fontSize.value} min={0} onChange={fontSize.onChange} />
      </ControlRow>

      <ControlRow title='Letter'>
        <InputNumber value={letterSpacing.value} onChange={letterSpacing.onChange} />
        <Stepper value={letterSpacing.value} onChange={letterSpacing.onChange} />
      </ControlRow>

      <ControlRow title='Line'>
        <InputNumber value={lineHeight.value} step={0.1} onChange={lineHeight.onChange} />
        <Stepper value={lineHeight.value} step={0.1} onChange={lineHeight.onChange} />
      </ControlRow>

      <ControlRow title='Transform'>
        <ControlRowWide>
          <Select value={transform.value} onChange={transform.onChange}>
            {transform.items.map(val => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </Select>
        </ControlRowWide>
      </ControlRow>

      <ControlRow title='Decoration'>
        <ControlRowWide>
          <TabsSelector
            items={decoration.items}
            value={decoration.value}
            onChange={({ name }) => decoration.onChange(name)}
          />
        </ControlRowWide>
      </ControlRow>

      <ControlRow title='Align'>
        <ControlRowWide>
          <TabsSelector items={align.items} value={align.value} onChange={({ name }) => align.onChange(name)} />
        </ControlRowWide>
      </ControlRow>
    </Panel>
  )
}

export default BuilderText
