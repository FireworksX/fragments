import React, { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { builderVariableType } from '@fragments/fragments-plugin/performance'
import { Panel } from '@/shared/ui/Panel'
import { Dropdown } from '@/shared/ui/Dropdown'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import { DropdownOption } from '@/shared/ui/DropdownOption'
import { PanelHeadAside } from '@/shared/ui/PanelHeadAside'
import { BuilderVariableCell } from '@/features/fragmentBuilder/BuilderVariableCell'
import { useBuilderVariables } from '@/shared/hooks/fragmentBuilder/useBuilderVariables'

interface BuilderVariablesProps {
  className?: string
}

const types = Object.keys(builderVariableType)

export const BuilderVariables: FC<BuilderVariablesProps> = ({ className }) => {
  const { propsLinks, variables, openVariable } = useBuilderVariables()

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
                  {variables.map(variableCell => (
                    <DropdownOption
                      key={variableCell.type}
                      onClick={() => variableCell.createAndAppend({}, { intital: true })}
                    >
                      {variableCell.type}
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
            <BuilderVariableCell key={link} variableKey={link} onClick={() => openVariable(link, { initial: true })} />
          ))}
        </div>
      </Panel>
    </div>
  )
}
