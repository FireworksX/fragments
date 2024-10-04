import React, { FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useBuilderAssets } from '../hooks/useBuilderAssets'
import Plus from '@/shared/icons/plus.svg'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { Dropdown } from '@/shared/ui/Dropdown'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import { DropdownOption } from '@/shared/ui/DropdownOption'
import { Touchable } from '@/shared/ui/Touchable'
import { Collapse } from '@/shared/ui/Collapse'
import { Panel } from '@/shared/ui/Panel'
import { ColorCell } from '@/shared/ui/ColorCell'
import { CssCell } from '@/shared/ui/CssCell'

interface BuilderAssetsProps {
  className?: string
}

const BuilderAssets: FC<BuilderAssetsProps> = ({ className }) => {
  const { documentManager } = useContext(BuilderContext)
  const { editColor, createColor, colorVariables, removeColor, createCssOverride, cssVariables, editCssOverride } =
    useBuilderAssets()

  return (
    <div className={cn(styles.root, className)}>
      <Panel
        title='Styles'
        aside={
          <Dropdown
            trigger='click'
            options={
              <>
                <DropdownGroup>
                  {/*<DropdownOption>Text</DropdownOption>*/}
                  <DropdownOption onClick={createColor}>Color</DropdownOption>
                  <DropdownOption onClick={createCssOverride}>CSS</DropdownOption>
                </DropdownGroup>
              </>
            }
          >
            <Touchable action>
              <Plus width={14} height={14} />
            </Touchable>
          </Dropdown>
        }
      >
        <div className={styles.panelBody}>
          {/*<Collapse title='Text'>*/}
          {/*  <h1>test</h1>*/}
          {/*</Collapse>*/}
          {colorVariables.length > 0 && (
            <Collapse title='Colors'>
              {colorVariables.map(color => (
                <ColorCell
                  key={color?.name}
                  color={color?.color}
                  onClick={() => editColor(documentManager.keyOfEntity(color), { initial: true, position: 'left' })}
                  onDelete={() => removeColor(documentManager.keyOfEntity(color))}
                >
                  {color?.name}
                </ColorCell>
              ))}
            </Collapse>
          )}
          {cssVariables.length > 0 && (
            <Collapse title='CSS Overrides'>
              {cssVariables.map(value => (
                <CssCell
                  key={value?.name}
                  onClick={() =>
                    editCssOverride(documentManager.keyOfEntity(value), { initial: true, position: 'left' })
                  }
                  onDelete={() => removeColor(documentManager.keyOfEntity(value))}
                >
                  {value?.name}
                </CssCell>
              ))}
            </Collapse>
          )}
        </div>
      </Panel>
    </div>
  )
}

export default BuilderAssets
