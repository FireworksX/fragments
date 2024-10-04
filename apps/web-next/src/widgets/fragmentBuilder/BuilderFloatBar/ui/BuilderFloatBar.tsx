import React, { FC, useContext } from 'react'
import { animated } from '@react-spring/web'
import { useGraph } from '@graph-state/react'
import styles from './styles.module.css'
import DefaultCursor from '@/shared/icons/default-cursor.svg'
import GrabCursor from '@/shared/icons/grab-cursor.svg'
import Lightning from '@/shared/icons/lightning.svg'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { Touchable } from '@/shared/ui/Touchable'
import { Dropdown } from '@/shared/ui/Dropdown'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import { DropdownOption } from '@/shared/ui/DropdownOption'
import { SelectMimicry } from '@/shared/ui/SelectMimicry'
import { Button } from '@/shared/ui/Button'
import { useBuilderManager } from '@/shared/hooks/fragmentBuilder/useBuilderManager'
import { FloatingBar } from '@/features/fragmentBuilder/FloatingBar'
import { useBuilderActions } from '@/shared/hooks/fragmentBuilder/useBuilderActions'

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
