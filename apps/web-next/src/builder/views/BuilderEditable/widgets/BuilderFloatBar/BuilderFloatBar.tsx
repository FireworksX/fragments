import React, { FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import DefaultCursor from '@/app/svg/default-cursor.svg'
import GrabCursor from '@/app/svg/grab-cursor.svg'
import Dropdown from '@/app/components/Dropdown/Dropdown'
import DropdownGroup from '@/app/components/Dropdown/components/DropdownGroup/DropdownGroup'
import DropdownOption from '@/app/components/Dropdown/components/DropdownOption/DropdownOption'
import Lightning from '@/app/svg/lightning.svg'
import SelectMimicry from '@/app/components/SelectMimicry/SelectMimicry'
import { animated } from '@react-spring/web'
import Button from '@/app/components/Button'
import { builderModes, useBuilderManager } from '@/builder/hooks/useBuilderManager'
import FloatingBar from '@/builder/components/FloatingBar'
import { useGraph } from '@graph-state/react'
import { BuilderContext } from '@/builder/BuilderContext'
import { useBuilderActions } from '@/builder/hooks/useBuilderActions'
import Touchable from '@/app/components/Touchable'

interface BuilderFloatBarProps {
  className?: string
}

export const BuilderFloatBar: FC<BuilderFloatBarProps> = ({ className }) => {
  const { canvasManager } = useContext(BuilderContext)
  const { isEdit, focus, updateParams } = useBuilderManager()
  const [canvas] = useGraph(canvasManager)
  const { addFrame, addText } = useBuilderActions()

  if (!isEdit) {
    return
  }

  return (
    <FloatingBar
      actions={[
        {
          kind: 'component',
          component: (
            <Touchable className={styles.actionButton} TagName='button' onClick={() => undefined}>
              <DefaultCursor width={20} height={20} />
            </Touchable>
          )
        },
        {
          kind: 'component',
          component: (
            <Touchable className={styles.actionButton} TagName='button' onClick={() => undefined}>
              <GrabCursor width={20} height={20} />
            </Touchable>
          )
        },
        {
          kind: 'component',
          component: (
            <Dropdown
              trigger='click'
              options={
                <DropdownGroup>
                  <DropdownOption onClick={addFrame}>Add Frame</DropdownOption>
                  <DropdownOption onClick={addText}>Add Text</DropdownOption>
                </DropdownGroup>
              }
            >
              <Touchable className={styles.actionButton} TagName='button' onClick={() => undefined}>
                <Lightning width={20} height={20} />
              </Touchable>
            </Dropdown>
          )
        },
        {
          kind: 'component',
          component: (
            <SelectMimicry className={styles.zoomSelect}>
              <animated.div>
                {canvas.scale.to(scale =>
                  Math.floor(scale * 100)
                    .toFixed(0)
                    .concat('%')
                )}
              </animated.div>
            </SelectMimicry>
          )
        },
        { kind: 'delimiter' },
        {
          kind: 'component',
          component: <Button>Publish</Button>
        }
      ]}
    />
  )
}
