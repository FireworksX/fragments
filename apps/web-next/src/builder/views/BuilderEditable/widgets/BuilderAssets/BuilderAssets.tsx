import React, { FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useBuilderAssets } from './hooks/useBuilderAssets'
import Touchable from '@/app/components/Touchable'
import Collapse from '@/app/components/Collapse/Collapse'
import Dropdown from '@/app/components/Dropdown/Dropdown'
import DropdownGroup from '@/app/components/Dropdown/components/DropdownGroup/DropdownGroup'
import DropdownOption from '@/app/components/Dropdown/components/DropdownOption/DropdownOption'
import Plus from '@/app/svg/plus.svg'
import Panel from '@/builder/components/Panel/Panel'
import PanelHeadAside from '@/builder/components/PanelHeadAside/PanelHeadAside'
import ComponentCell from '@/builder/components/ComponentCell/ComponentCell'
import ColorCell from '@/builder/components/ColorCell/ColorCell'
import CssCell from '@/builder/components/CssCell/CssCell'
import { BuilderContext } from '@/builder/BuilderContext'

interface BuilderAssetsProps {
  className?: string
}

const BuilderAssets: FC<BuilderAssetsProps> = ({ className }) => {
  const { documentManager } = useContext(BuilderContext)
  const {
    editColor,
    createColor,
    colorVariables,
    removeColor,
    createCssOverride,
    cssVariables,
    editCssOverride,
    components: { list: componentsList, add: addComponent, click: onClickComponent, insert: insertComponent }
  } = useBuilderAssets()

  return (
    <div className={cn(styles.root, className)}>
      <Panel title='Components' aside={<PanelHeadAside onClick={addComponent} />}>
        {componentsList.length > 0 && (
          <div className={styles.panelBody}>
            <Collapse title='Local'>
              {componentsList.map(component => (
                <ComponentCell
                  key={component._id}
                  onInsert={() => insertComponent(component)}
                  onClick={() => onClickComponent(documentManager.keyOfEntity(component))}
                >
                  {component.name}
                </ComponentCell>
              ))}
            </Collapse>
          </div>
        )}
      </Panel>
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
