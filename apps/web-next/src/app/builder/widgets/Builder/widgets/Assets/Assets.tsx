import React, { FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import ColorCell from '../../components/ColorCell/ColorCell'
import { useBuilderAssets } from './hooks/useBuilderAssets'
import Touchable from '@/app/components/Touchable'
import Button from '@/app/components/Button'
import Cell from '@/app/builder/widgets/Builder/components/Cell/Cell'
import Panel from '@/app/builder/widgets/Builder/components/Panel/Panel'
import Collapse from '@/app/components/Collapse/Collapse'
import Dropdown from '@/app/components/Dropdown/Dropdown'
import DropdownGroup from '@/app/components/Dropdown/components/DropdownGroup/DropdownGroup'
import DropdownOption from '@/app/components/Dropdown/components/DropdownOption/DropdownOption'
import CssCell from '@/app/builder/widgets/Builder/components/CssCell/CssCell'
import PanelHeadAside from '@/app/builder/widgets/Builder/components/PanelHeadAside/PanelHeadAside'
import Plus from '@/app/svg/plus.svg'
import { BuilderContext } from '@/app/builder/widgets/Builder/BuilderContext'
import ComponentFrame from '@/app/svg/component-frame.svg'

interface BuilderAssetsProps {
  className?: string
}

const Assets: FC<BuilderAssetsProps> = ({ className }) => {
  const { graphState } = useContext(BuilderContext)
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
                <div className={styles.colorWrapper} key={component._id}>
                  <Cell
                    className={styles.componentCell}
                    key={component._id}
                    before={<ComponentFrame className={styles.cellIcon} width={10} />}
                    description={
                      <Button
                        className={styles.colorAction}
                        mode='secondary'
                        onClick={() => insertComponent(component)}
                      >
                        Insert
                      </Button>
                    }
                    onClick={() => onClickComponent(graphState.keyOfEntity(component))}
                  >
                    {component.name}
                  </Cell>
                </div>
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
                <div className={styles.colorWrapper} key={color?.name}>
                  <ColorCell
                    color={color?.color}
                    description={
                      <Button
                        className={styles.colorAction}
                        mode='secondary'
                        onClick={() => removeColor(graphState.keyOfEntity(color))}
                      >
                        Delete
                      </Button>
                    }
                    onClick={() => editColor(graphState.keyOfEntity(color), { initial: true, position: 'left' })}
                  >
                    {color?.name}
                  </ColorCell>
                </div>
              ))}
            </Collapse>
          )}
          {cssVariables.length > 0 && (
            <Collapse title='CSS Overrides'>
              {cssVariables.map(value => (
                <div className={styles.colorWrapper} key={value?.name}>
                  <CssCell
                    description={
                      <Button mode='secondary' onClick={() => removeColor(graphState.keyOfEntity(value))}>
                        Delete
                      </Button>
                    }
                    onClick={() => editCssOverride(graphState.keyOfEntity(value), { initial: true, position: 'left' })}
                  >
                    {value?.name}
                  </CssCell>
                </div>
              ))}
            </Collapse>
          )}
        </div>
      </Panel>
    </div>
  )
}

export default Assets
