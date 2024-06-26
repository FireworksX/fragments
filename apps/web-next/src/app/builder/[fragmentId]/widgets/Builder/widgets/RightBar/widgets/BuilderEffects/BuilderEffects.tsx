'use client'
import { FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useBuilderEffects } from './hooks/useBuilderEffects'
import ControlRow from '@/app/builder/widgets/Builder/components/ControlRow/ControlRow'
import ControlRowWide from '@/app/builder/widgets/Builder/components/ControlRow/components/ControlRowWide/ControlRowWide'
import Panel from '@/app/builder/widgets/Builder/components/Panel/Panel'
import Dropdown from '@/app/components/Dropdown/Dropdown'
import DropdownGroup from '@/app/components/Dropdown/components/DropdownGroup/DropdownGroup'
import DropdownOption from '@/app/components/Dropdown/components/DropdownOption/DropdownOption'
import PanelHeadAside from '@/app/builder/widgets/Builder/components/PanelHeadAside/PanelHeadAside'
import InputSelect from '@/app/components/InputSelect/InputSelect'
import { capitalize } from '@/app/utils/capitalize'
import { BuilderContext } from '@/app/builder/widgets/Builder/BuilderContext'
import { builderEffectType, builderNodes } from '@fragments/fragments-plugin'
import Star2 from '@/app/svg/star-2.svg'

interface BuilderEffectsProps {
  className?: string
}

const BuilderEffects: FC<BuilderEffectsProps> = ({ className }) => {
  const { graphState } = useContext(BuilderContext)
  const { selectionGraph, effects, addEffect, clickEffect, resetEffect } = useBuilderEffects()

  if ([builderNodes.Screen, builderNodes.ComponentInstance].some(type => type === selectionGraph._type)) {
    return null
  }

  return (
    <Panel
      className={cn(styles.root, className)}
      title='Effects'
      aside={
        <Dropdown
          placement='bottom'
          trigger='click'
          options={
            <DropdownGroup>
              {Object.keys(builderEffectType).map(type => (
                <DropdownOption key={type} disabled={type !== builderEffectType.loop} onClick={() => addEffect(type)}>
                  {capitalize(type)}
                </DropdownOption>
              ))}
            </DropdownGroup>
          }
        >
          <PanelHeadAside />
        </Dropdown>
      }
    >
      {effects !== graphState.empty &&
        effects?.map(effect => (
          <ControlRow key={effect.type} title={capitalize(effect.type)}>
            <ControlRowWide>
              <InputSelect
                icon={<Star2 className={styles.iconContainer} width={14} />}
                // color={colors.primary}
                onClick={() => clickEffect(effect.type)}
                onReset={() => resetEffect(effect.type)}
              >
                Effect
              </InputSelect>
            </ControlRowWide>
          </ControlRow>
        ))}
    </Panel>
  )
}

export default BuilderEffects
