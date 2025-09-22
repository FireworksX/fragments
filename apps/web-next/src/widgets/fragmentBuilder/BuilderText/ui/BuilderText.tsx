import React, { FC, useContext } from 'react'
import { useBuilderText } from '../hooks/useBuilderText'
import { useGraph } from '@graph-state/react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useDisplayColor } from '@/shared/hooks/fragmentBuilder/useDisplayColor'
import { Panel } from '@/shared/ui/Panel'
import { Button } from '@/shared/ui/Button'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { Select } from '@/shared/ui/Select'
import { InputSelect } from '@/shared/ui/InputSelect'
import { InputNumber } from '@/shared/ui/InputNumber'
import { Stepper } from '@/shared/ui/Stepper'
import { TabsSelector } from '@/shared/ui/TabsSelector'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { InputText } from '@/shared/ui/InputText'
import { useBuilderTextBase } from '@/widgets/fragmentBuilder/BuilderText/hooks/useBuilderTextBase'
import { BuilderTextColor } from '@/widgets/fragmentBuilder/BuilderTextColor'
import { BuilderTextContent } from '@/widgets/fragmentBuilder/BuilderTextContent'

interface BuilderTextProps {
  className?: string
}

const BuilderText: FC<BuilderTextProps> = ({ className }) => {
  const { weight, align, fontSize, whiteSpace, lineHeight, letterSpacing, transform, decoration } = useBuilderTextBase()

  return (
    <Panel className={className} title='Text'>
      {/*<BuilderControlRow title='Styles'>*/}
      {/*  <BuilderControlRowWide>*/}
      {/*    <InputSelect icon={<InputSelectTextIcon />}>{colors.secondary}</InputSelect>*/}
      {/*  </BuilderControlRowWide>*/}
      {/*</BuilderControlRow>*/}
      <BuilderTextContent />

      {/*<BuilderControlRow title='Font'>*/}
      {/*  <BuilderControlRowWide>*/}
      {/*    <SelectMimicry onClick={font.onClick}>{font.value}</SelectMimicry>*/}
      {/*  </BuilderControlRowWide>*/}
      {/*</BuilderControlRow>*/}

      <ControlRow title='Weight'>
        <ControlRowWide>
          <Select value={weight.isMixed ? 'mixed' : weight.value} onChange={weight.changeValue}>
            {weight.isMixed && <option value='mixed'>Mixed</option>}
            {weight.items.map(({ label, value }) => (
              <option key={label} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </ControlRowWide>
      </ControlRow>

      <BuilderTextColor />

      <ControlRow title='Size'>
        {fontSize.isMixed ? (
          <InputText value='Mixed' disabled />
        ) : (
          <InputNumber value={fontSize.value} min={0} onChange={fontSize.changeValue} />
        )}
        <Stepper value={fontSize.value} min={0} onChange={fontSize.changeValue} />
      </ControlRow>

      <ControlRow title='Letter'>
        {letterSpacing.isMixed ? (
          <InputText value='Mixed' disabled />
        ) : (
          <InputNumber value={letterSpacing.value} onChange={letterSpacing.changeValue} />
        )}

        <Stepper value={letterSpacing.value} onChange={letterSpacing.changeValue} />
      </ControlRow>

      <ControlRow title='Line'>
        {lineHeight.isMixed ? (
          <InputText value='Mixed' disabled />
        ) : (
          <InputNumber value={lineHeight.value} step={0.1} onChange={lineHeight.changeValue} />
        )}

        <Stepper value={lineHeight.value} step={0.1} onChange={lineHeight.changeValue} />
      </ControlRow>

      <ControlRow title='Transform'>
        <ControlRowWide>
          <Select value={transform.isMixed ? 'mixed' : transform.value} onChange={transform.changeValue}>
            {transform.isMixed && <option value='mixed'>Mixed</option>}
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
            onChange={({ name }) => decoration.changeValue(name)}
          />
        </ControlRowWide>
      </ControlRow>

      <ControlRow title='Align'>
        <ControlRowWide>
          <TabsSelector items={align.items} value={align.value} onChange={({ name }) => align.changeValue(name)} />
        </ControlRowWide>
      </ControlRow>

      <ControlRow title='Space'>
        <ControlRowWide>
          <Select value={whiteSpace.value} onChange={whiteSpace.onChange}>
            {whiteSpace.options.map(option => (
              <option key={option}>{option}</option>
            ))}
          </Select>
        </ControlRowWide>
      </ControlRow>
    </Panel>
  )
}

export default BuilderText
