'use client'
import { FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useBuilderEffects } from './hooks/useBuilderEffects'
import { builderEffectType, builderNodes } from '@fragmentsx/fragments-plugin'
import Star2 from '@/app/svg/star-2.svg'
import Panel from '@/builder/components/Panel/Panel'
import PanelHeadAside from '@/builder/components/PanelHeadAside/PanelHeadAside'
import ControlRow from '@/builder/components/ControlRow/ControlRow'
import ControlRowWide from '@/builder/components/ControlRow/components/ControlRowWide/ControlRowWide'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { Dropdown } from '@/shared/ui/Dropdown'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import { DropdownOption } from '@/shared/ui/DropdownOption'
import { capitalize } from '@/shared/utils/capitalize'
import { InputSelect } from '@/shared/ui/InputSelect'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'

interface BuilderEffectsProps {
  className?: string
}

const BuilderEffects: FC<BuilderEffectsProps> = ({ className }) => {
  const { documentManager } = useBuilderDocument()
  const { selectionGraph, effects, addEffect, clickEffect, resetEffect } = useBuilderEffects(documentManager)

  if ([builderNodes.Screen, builderNodes.ComponentInstance].some(type => type === selectionGraph?._type)) {
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
      {effects !== documentManager.empty &&
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
