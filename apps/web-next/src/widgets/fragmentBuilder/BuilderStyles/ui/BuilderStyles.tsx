import { FC, use, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useBuilderStyles } from '../hooks/useBuilderStyles'
import { GraphValue } from '@graph-state/react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { to } from '@fragments/springs-factory'
import { Panel } from '@/shared/ui/Panel'
import { Dropdown } from '@/shared/ui/Dropdown'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import { DropdownOption } from '@/shared/ui/DropdownOption'
import { PanelHeadAside } from '@/shared/ui/PanelHeadAside'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputNumber } from '@/shared/ui/InputNumber'
import { Slider } from '@/shared/ui/Slider'
import { TabsSelector } from '@/shared/ui/TabsSelector'
import { InputSelect } from '@/shared/ui/InputSelect'
import { Select } from '@/shared/ui/Select'
import { capitalize } from '@/shared/utils/capitalize'
import { AnimatedVisible } from '@/shared/ui/AnimatedVisible'
import { BuilderStylesCorners } from '@/features/fragmentBuilder/BuilderStylesCorners'
import { Stepper } from '@/shared/ui/Stepper'
import { useDisplayColor } from '@/shared/hooks/fragmentBuilder/useDisplayColor'
import { borderType, paintMode } from '@fragments/plugin-fragment-spring'
import { isValue } from '@fragments/utils'
import { useInterpolation } from '@/shared/hooks/useInterpolation'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { booleanTabsSelectorItems } from '@/shared/data'

interface BuilderStylesProps {
  className?: string
}

const ALLOW_FILL_TYPES = [paintMode.Solid]

const BuilderStyles: FC<BuilderStylesProps> = ({ className }) => {
  const { documentManager } = useBuilderDocument()
  const { selectionGraph, opacity, overflow, visible, zIndex, radius, fill, border } = useBuilderStyles()
  const { getColor, getNameColor } = useDisplayColor(documentManager)
  // const fillContent = useInterpolation([fill.type], v =>
  //   ALLOW_FILL_TYPES.includes(v) ? getNameColor(v /* value */) : v === paintMode.Image ? 'Image' : ''
  // )

  return (
    <Panel
      className={cn(styles.root, className)}
      title='Styles'
      aside={
        <Dropdown
          trigger='click'
          options={
            <DropdownGroup>
              {!isValue(zIndex.value) && <DropdownOption onClick={() => zIndex.update(1)}>Z Index</DropdownOption>}
            </DropdownGroup>
          }
        >
          <PanelHeadAside />
        </Dropdown>
      }
    >
      <ControlRow title='Opacity' {...opacity}>
        <InputNumber value={opacity.value} step={0.1} max={1} min={0} onChange={opacity.update} />
        <Slider value={opacity.value} step={0.1} max={1} min={0} onChange={opacity.update} />
      </ControlRow>

      <ControlRow title='Visible' {...visible}>
        <ControlRowWide>
          <TabsSelector
            items={booleanTabsSelectorItems}
            value={visible.value}
            onChange={({ name }) => visible.update(name)}
          />
        </ControlRowWide>
      </ControlRow>

      {!fill.disabled && (
        <ControlRow title='Fill'>
          <ControlRowWide>
            <InputSelect
              hasIcon={!!fill.solidFill && ALLOW_FILL_TYPES.includes(fill.type)}
              color={fill.solidFill}
              onReset={fill.onReset}
              onClick={fill.onClick}
            >
              {fill.type && ALLOW_FILL_TYPES.includes(fill.type)
                ? fill.solidFill
                : fill.type === paintMode.Image
                ? 'Image'
                : ''}
            </InputSelect>
          </ControlRowWide>
        </ControlRow>
      )}

      {!overflow.disabled && (
        <ControlRow title='Overflow' {...overflow}>
          <ControlRowWide>
            <Select value={overflow.value} onChange={overflow.update}>
              {overflow.options.map(value => (
                <option key={value} value={value}>
                  {capitalize(value)}
                </option>
              ))}
            </Select>
          </ControlRowWide>
        </ControlRow>
      )}

      {!radius.disabled && (
        <>
          <ControlRow title='Radius'>
            <InputNumber value={radius.value} empty={radius.cornerMode === 'sides'} onChange={radius.update} />
            <TabsSelector
              cellClassName={styles.borderCell}
              items={radius.items}
              value={radius.cornerMode}
              onChange={({ name }) => radius.setCornerMode(name)}
            />
          </ControlRow>
          {radius.cornerMode === 'sides' && (
            <BuilderStylesCorners
              values={radius.sidesValues}
              focusCorner={radius.setCornerSide}
              onChange={(side, value) => radius.setCornerSideValue(side, value)}
            />
          )}
        </>
      )}

      {!border.disabled && (
        <ControlRow title='Border'>
          <ControlRowWide>
            <InputSelect
              placeholder='Add...'
              hasIcon={!!border.borderType && border.borderType !== borderType.None}
              color={border.borderColor}
              onReset={border.onReset}
              onClick={border.onClick}
            >
              {border.borderType !== borderType.None ? border.borderType : ''}
            </InputSelect>
          </ControlRowWide>
        </ControlRow>
      )}

      {isValue(zIndex.value) && (
        <ControlRow title='Z Index'>
          <InputNumber value={zIndex.value} onChange={zIndex.update} />
          <Stepper value={zIndex.value} onChange={zIndex.update} />
        </ControlRow>
      )}
    </Panel>
  )
}

export default BuilderStyles
