'use client'
import { FC, useContext } from 'react'
import cn from 'classnames'
// import { StatexValue } from '@adstore/statex-react'
// import { useStore } from '@nanostores/react'
import styles from './styles.module.css'
import { useBuilderStyles } from './hooks/useBuilderStyles'
import Dropdown from '@/app/components/Dropdown/Dropdown'
import DropdownGroup from '@/app/components/Dropdown/components/DropdownGroup/DropdownGroup'
import InputNumber from '@/app/components/InputNumber/InputNumber'
import Slider from '@/app/components/Slider/Slider'
import TabsSelector from '@/app/components/TabsSelector'
import DropdownOption from '@/app/components/Dropdown/components/DropdownOption/DropdownOption'
import InputSelect from '@/app/components/InputSelect/InputSelect'
import Stepper from '@/app/components/Stepper/Stepper'
import { GraphValue } from '@graph-state/react'
import { builderNodes, builderPaintMode } from '@fragments/fragments-plugin'
import { useDisplayColor } from '@/builder/hooks/useDisplayColor'
import Panel from '@/builder/components/Panel/Panel'
import PanelHeadAside from '@/builder/components/PanelHeadAside/PanelHeadAside'
import ControlRow from '@/builder/components/ControlRow/ControlRow'
import ControlRowWide from '@/builder/components/ControlRow/components/ControlRowWide/ControlRowWide'
import { BuilderContext } from '@/builder/BuilderContext'
import { SpringValue } from '@react-spring/web'

interface BuilderStylesProps {
  className?: string
}

const BuilderStyles: FC<BuilderStylesProps> = ({ className }) => {
  const { documentManager } = useContext(BuilderContext)
  const { selectionGraph, opacity, visible, zIndex, radius, fill, border } = useBuilderStyles()
  const { getColor, getNameColor } = useDisplayColor(documentManager)

  if (![builderNodes.Frame, builderNodes.ComponentVariant].some(type => type === selectionGraph?._type)) {
    return null
  }

  return (
    <Panel
      className={cn(styles.root, className)}
      title='Styles'
      aside={
        <Dropdown
          trigger='click'
          options={
            <DropdownGroup>
              {zIndex.disabled && <DropdownOption onClick={zIndex.onClick}>Z Index</DropdownOption>}
            </DropdownGroup>
          }
        >
          <PanelHeadAside />
        </Dropdown>
      }
    >
      <ControlRow title='Opacity' {...opacity}>
        <InputNumber value={opacity.value} step={0.1} max={1} min={0} onChange={opacity.onChange} />
        <Slider value={opacity.value} step={0.1} max={1} min={0} onChange={opacity.onChange} />
      </ControlRow>

      <ControlRow title='Visible' {...visible}>
        <ControlRowWide>
          <TabsSelector items={visible.items} value={visible.value} onChange={({ name }) => visible.onChange(name)} />
        </ControlRowWide>
      </ControlRow>

      {!fill.disabled && (
        <ControlRow title='Fill' actions={fill.actions} isHighlight={fill.isOverride}>
          <ControlRowWide>
            <GraphValue graphState={documentManager} field={fill.value?.color}>
              {value => (
                <InputSelect
                  hasIcon={fill.value?.type === builderPaintMode.Solid}
                  color={getColor(value)}
                  onReset={fill.onReset}
                  onClick={fill.onClick}
                >
                  {fill?.type === builderPaintMode.Solid
                    ? getNameColor(value)
                    : fill?.type === builderPaintMode.Image
                    ? 'Image'
                    : null}
                </InputSelect>
              )}
            </GraphValue>
          </ControlRowWide>
        </ControlRow>
      )}

      {!radius.disabled && (
        <ControlRow title='Radius' actions={radius.actions} isHighlight={radius.isOverride}>
          <ControlRowWide>
            <InputNumber value={radius.value} onChange={radius.onChange} />
          </ControlRowWide>
        </ControlRow>
      )}

      {!border.disabled && (
        <ControlRow title='Border' actions={border.actions} isHighlight={border.isOverride}>
          <ControlRowWide>
            <GraphValue graphState={documentManager} field={border.value?.color}>
              {value => (
                <InputSelect color={getColor(value)} onReset={border.onReset} onClick={border.onClick}>
                  {border.value?.type}
                </InputSelect>
              )}
            </GraphValue>
          </ControlRowWide>
        </ControlRow>
      )}

      {!zIndex.disabled && (
        <ControlRow title='Z Index' actions={zIndex.actions} isHighlight={zIndex.isOverride}>
          <InputNumber value={zIndex.value} onChange={zIndex.onChange} />
          <Stepper value={zIndex.value} onChange={zIndex.onChange} />
        </ControlRow>
      )}
    </Panel>
  )
}

export default BuilderStyles
