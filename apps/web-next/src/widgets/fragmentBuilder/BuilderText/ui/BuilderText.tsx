import { FC, useContext } from 'react'
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

interface BuilderTextProps {
  className?: string
}

const BuilderText: FC<BuilderTextProps> = ({ className }) => {
  const { builderManager } = useContext(BuilderContext)
  const { selectionGraph } = useBuilderSelection()
  const { weight, color, align, fontSize, lineHeight, letterSpacing, transform, decoration } = useBuilderText()
  const { getColor, getNameColor } = useDisplayColor()
  const [{ showTextEditor }] = useGraph(builderManager, builderManager.key)

  return (
    <Panel className={className} title='Text'>
      {!showTextEditor ? (
        <Button stretched mode='secondary' onClick={() => builderManager.toggleTextEditor()}>
          Edit
        </Button>
      ) : (
        <>
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
              <InputSelect color={color.value} onClick={color.onClick}>
                {color.value || getNameColor(color.value)}
              </InputSelect>
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
        </>
      )}
    </Panel>
  )
}

export default BuilderText
