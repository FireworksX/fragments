import { FC } from 'react'
import * as Styled from './styles'
import ControlRow from '@/app/builder/widgets/Builder/components/ControlRow/ControlRow'
import ControlRowWide from '@/app/builder/widgets/Builder/components/ControlRow/components/ControlRowWide/ControlRowWide'
import InputSelect from 'src/components/InputSelect/InputSelect'
import Select from 'src/components/Select/Select'
import InputNumber from 'src/components/InputNumber/InputNumber'
import Stepper from 'src/components/Stepper/Stepper'
import TabsSelector from 'src/components/TabsSelector/TabsSelector'
import { useBuilderText } from './hooks/useBuilderText'
import { StatexValue } from '@adstore/statex-react'
import { useStore } from '@nanostores/react'
import { $statex } from '../../../../../../store/builderRouterStore'
import { useDisplayColor } from '../../../../../../hooks/useDisplayColor'

interface BuilderTextProps {
  className?: string
}

const BuilderText: FC<BuilderTextProps> = ({ className }) => {
  const statex = useStore($statex)
  const { enabled, weight, color, fontSize, lineHeight, letterSpacing, transform, decoration } = useBuilderText()
  const { getColor, getNameColor } = useDisplayColor()

  if (!enabled) {
    return null
  }

  return (
    <Styled.Root className={className} title='Text'>
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
            {weight.items.map(val => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </Select>
        </ControlRowWide>
      </ControlRow>

      <ControlRow title='Color'>
        <ControlRowWide>
          <StatexValue statex={statex} field={color.value}>
            {value => (
              <InputSelect color={getColor(value)} onClick={color.onClick}>
                {getNameColor(value)}
              </InputSelect>
            )}
          </StatexValue>
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
    </Styled.Root>
  )
}

export default BuilderText
