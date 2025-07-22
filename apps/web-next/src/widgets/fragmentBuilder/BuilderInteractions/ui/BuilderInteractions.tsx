import { FC, memo, useContext } from 'react'
import cn from 'classnames'
import { definition } from '@fragmentsx/definition'
import styles from './styles.module.css'
import { useBuilderInteractions } from '../hooks/useBuilderInteractions'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { Panel } from '@/shared/ui/Panel'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputNumber } from '@/shared/ui/InputNumber'
import { Select } from '@/shared/ui/Select'
import { AnimatedVisible } from '@/shared/ui/AnimatedVisible'
import { PanelHeadAside } from '@/shared/ui/PanelHeadAside'
import { InputSelect } from '@/shared/ui/InputSelect'
import { capitalize } from '@/shared/utils/capitalize'
import ActionIcon from '@/shared/icons/next/zap.svg'
import GoalIcon from '@/shared/icons/next/circle-dot.svg'
import { Dropdown } from '@/shared/ui/Dropdown'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import { DropdownOption } from '@/shared/ui/DropdownOption'
import { RenderDropdown } from '@/shared/ui/RenderDropdown'
import { GraphValue } from '@graph-state/react'

interface BuilderPositionProps {
  className?: string
}

const BuilderInteractions: FC<BuilderPositionProps> = memo(({ className }) => {
  const { manager, interactions, actions, openInteraction, removeInteraction } = useBuilderInteractions()
  //
  // if (!selectionGraph?.position && selectionGraph?._type !== builderNodes.Screen) {
  //   return null
  // }
  return (
    <Panel
      className={cn(styles.root, className)}
      title='Interactions'
      aside={
        <RenderDropdown hideOnClick trigger='click' options={actions}>
          <PanelHeadAside />
        </RenderDropdown>
      }
    >
      {interactions?.map?.((interaction, index) => (
        <GraphValue key={`${index}_${interaction.event}`} graphState={manager} field={interaction.event}>
          {event => (
            <ControlRow title={capitalize(interaction.on)}>
              <ControlRowWide>
                <InputSelect
                  icon={
                    event.mode === definition.eventMode.callback ? (
                      <ActionIcon style={{ color: 'var(--text-color)' }} />
                    ) : (
                      <GoalIcon style={{ color: 'var(--text-color)' }} />
                    )
                  }
                  color='var(--primary)'
                  placeholder='Set event...'
                  onReset={() => removeInteraction(index)}
                  onClick={() => openInteraction(index)}
                >
                  {event?.name}
                </InputSelect>
              </ControlRowWide>
            </ControlRow>
          )}
        </GraphValue>
      ))}

      {/*<AnimatedVisible visible={isVisible}>*/}
      {/*  <ControlRow title='Position'>*/}
      {/*    <InputNumber suffix='x' value={left.value} min={Infinity} max={Infinity} onChange={left.update} />*/}
      {/*    <InputNumber suffix='y' value={top.value} min={Infinity} max={Infinity} onChange={top.update} />*/}
      {/*  </ControlRow>*/}
      {/*</AnimatedVisible>*/}

      {/*<ControlRow title='Type'>*/}
      {/*  <ControlRowWide>*/}
      {/*    <Select value={type.value} onChange={type.update}>*/}
      {/*      {type.options.map(option => (*/}
      {/*        <option key={option.value} value={option.value} disabled={option.disabled}>*/}
      {/*          {option.label}*/}
      {/*        </option>*/}
      {/*      ))}*/}
      {/*    </Select>*/}
      {/*  </ControlRowWide>*/}
      {/*</ControlRow>*/}
    </Panel>
  )
})

export default BuilderInteractions
