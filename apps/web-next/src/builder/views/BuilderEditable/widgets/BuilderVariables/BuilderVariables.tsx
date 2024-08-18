import React, { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import PanelHeadAside from '@/builder/components/PanelHeadAside/PanelHeadAside'
import Collapse from '@/app/components/Collapse/Collapse'
import ComponentCell from '@/builder/components/ComponentCell/ComponentCell'
import Panel from '@/builder/components/Panel/Panel'
import DropdownGroup from '@/app/components/Dropdown/components/DropdownGroup/DropdownGroup'
import DropdownOption from '@/app/components/Dropdown/components/DropdownOption/DropdownOption'
import Dropdown from '@/app/components/Dropdown/Dropdown'
import { useBuilderVariables } from '@/builder/views/BuilderEditable/widgets/BuilderVariables/hooks/useBuilderVariables'
import { builderVariableType } from '@fragments/fragments-plugin/performance'
import Cell from '@/builder/components/Cell/Cell'
import { BuilderVariableCell } from '@/builder/views/BuilderEditable/widgets/BuilderVariables/components/BuilderVariableCell/BuilderVariableCell'
import { useBuilderVariablesDep } from '@/builder/views/BuilderEditable/widgets/BuilderVariables/hooks/useBuilderVariablesDep'

interface BuilderVariablesProps {
  className?: string
}

const types = Object.keys(builderVariableType)

export const BuilderVariables: FC<BuilderVariablesProps> = ({ className }) => {
  const { createProp, propsLinks, openVariable } = useBuilderVariables()

  return (
    <div className={cn(styles.root, className)} data-testid='BuilderVariables'>
      <Panel
        title='Props'
        aside={
          <Dropdown
            trigger='click'
            hideOnClick
            options={
              <>
                <DropdownGroup>
                  {types.map(type => (
                    <DropdownOption key={type} onClick={() => createProp(type)}>
                      {type}
                    </DropdownOption>
                  ))}
                </DropdownGroup>
              </>
            }
          >
            <PanelHeadAside />
          </Dropdown>
        }
      >
        <div className={styles.body}>
          {propsLinks.map(link => (
            <BuilderVariableCell key={link} variableKey={link} onClick={() => openVariable(link)}></BuilderVariableCell>
          ))}
        </div>
      </Panel>
    </div>
  )
}
