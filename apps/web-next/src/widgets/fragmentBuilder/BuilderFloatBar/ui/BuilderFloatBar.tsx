import React, { FC, useContext } from 'react'
import { animated } from '@react-spring/web'
import { useGraph } from '@graph-state/react'
import styles from './styles.module.css'
import DefaultCursor from '@/shared/icons/default-cursor.svg'
import GrabCursor from '@/shared/icons/grab-cursor.svg'
import InsertIcon from '@/shared/icons/next/circle-plus.svg'
import BreakpointsIcon from '@/shared/icons/next/tablet-smartphone.svg'
import TextIcon from '@/shared/icons/next/type.svg'
import ImageIcon from '@/shared/icons/next/image.svg'
import FrameIcon from '@/shared/icons/next/frame.svg'
import PlayIcon from '@/shared/icons/next/play.svg'
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
import { useBreakpoints } from '@/shared/hooks/fragmentBuilder/useBreakpoints'
import { Link } from '@/shared/ui/Link'
import { useBuilderCanvas } from '@/shared/hooks/fragmentBuilder/useBuilderCanvas'

interface BuilderFloatBarProps {
  className?: string
}

export const BuilderFloatBar: FC<BuilderFloatBarProps> = ({ className }) => {
  const { isEdit, focus, updateParams } = useBuilderManager()
  const { addFrame, addText, addImage } = useBuilderActions()

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
            <Touchable className={styles.actionButton} TagName='button' onClick={addFrame}>
              <FrameIcon width={20} height={20} />
            </Touchable>
          )
        },
        {
          kind: 'component',
          component: (
            <Touchable className={styles.actionButton} TagName='button' onClick={addText}>
              <TextIcon width={20} height={20} />
            </Touchable>
          )
        },
        {
          kind: 'component',
          component: (
            <Touchable className={styles.actionButton} TagName='button' onClick={addImage}>
              <ImageIcon width={20} height={20} />
            </Touchable>
          )
        },
        { kind: 'delimiter' },
        {
          kind: 'component',
          component: (
            <Link type='fragmentPreview'>
              <Button>Preview</Button>
            </Link>
          )
        }
      ]}
    />
  )
}
