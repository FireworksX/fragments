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
import { useBuilderActions } from '@/shared/hooks/fragmentBuilder/useBuilderActions'
import { useBreakpoints } from '@/shared/hooks/fragmentBuilder/useBreakpoints'
import { Link } from '@/shared/ui/Link'
import { useBuilderCanvas } from '@/shared/hooks/fragmentBuilder/useBuilderCanvas'
import { useBuilderCreator } from '@/shared/hooks/fragmentBuilder/useBuilderCreator'
import cn from 'classnames'
import { nodes } from '@fragments/plugin-fragment'
import { useBuilderDocumentManager } from '@/shared/hooks/fragmentBuilder/useBuilderDocumentManager'
import { Spinner } from '@/shared/ui/Spinner'

interface BuilderFloatBarProps {
  className?: string
}

export const BuilderFloatBar: FC<BuilderFloatBarProps> = ({ className }) => {
  const { fetchingUpdate } = useBuilderDocumentManager()
  const { creator, manager } = useBuilderCreator()
  const createType = creator.createType

  return (
    <div className={styles.root}>
      <Touchable
        className={cn(styles.actionButton, {
          [styles.active]: createType === nodes.Frame
        })}
        TagName='button'
        onClick={() => manager.setCreatorType(nodes.Frame)}
      >
        <FrameIcon width={20} height={20} />
      </Touchable>
      <Touchable
        className={cn(styles.actionButton, {
          [styles.active]: createType === nodes.Image
        })}
        TagName='button'
        onClick={() => manager.setCreatorType(nodes.Image)}
      >
        <ImageIcon width={20} height={20} />
      </Touchable>
      <Touchable
        className={cn(styles.actionButton, {
          [styles.active]: createType === nodes.Text
        })}
        TagName='button'
        onClick={() => manager.setCreatorType(nodes.Text)}
      >
        <TextIcon width={20} height={20} />
      </Touchable>

      <div className={styles.delimiter} />

      <Button>Preview</Button>

      {fetchingUpdate && (
        <div className={styles.spinner}>
          <Spinner size={16} color='var(--secondary)' />
        </div>
      )}
    </div>
  )
}
