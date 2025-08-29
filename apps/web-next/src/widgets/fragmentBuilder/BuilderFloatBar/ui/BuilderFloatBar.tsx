import React, { FC, useContext } from 'react'
import SparklesIcon from '@/shared/icons/next/sparkles.svg'
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
import CollectionIcon from '@/shared/icons/next/database.svg'
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
import { definition } from '@fragmentsx/definition'
import { Spinner } from '@/shared/ui/Spinner'
import { useBuilder } from '@/shared/hooks/fragmentBuilder/useBuilder'
import { BuilderFragmentPublish } from '@/widgets/fragmentBuilder/BuilderFragmentPublish'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { BuilderFloatBarCollection } from '@/widgets/fragmentBuilder/BuilderFloatBar/widgets/BuilderFloatBarCollection'
import { capitalize } from '@/shared/utils/capitalize'

interface BuilderFloatBarProps {
  className?: string
}

export const BuilderFloatBar: FC<BuilderFloatBarProps> = ({ className }) => {
  const { openPreview } = useBuilder()
  const { saveFragment } = useBuilderDocument()
  const { creator, manager } = useBuilderCreator()
  const createType = creator.createType

  return (
    <div className={styles.root}>
      <div className={cn(styles.info, { [styles.infoActive]: !!createType })}>
        <div className={styles.infoRow}>
          <SparklesIcon />
          <span>Click any layer in canvas for create {capitalize(createType)}</span>
        </div>
      </div>

      <div className={styles.body}>
        <Touchable
          className={cn(styles.actionButton, {
            [styles.active]: createType === definition.nodes.Frame
          })}
          TagName='button'
          onClick={() => manager.setCreatorType(definition.nodes.Frame)}
        >
          <FrameIcon width={20} height={20} />
        </Touchable>
        <Touchable
          className={cn(styles.actionButton, {
            [styles.active]: createType === definition.nodes.Image
          })}
          TagName='button'
          onClick={() => manager.setCreatorType(definition.nodes.Image)}
        >
          <ImageIcon width={20} height={20} />
        </Touchable>
        <Touchable
          className={cn(styles.actionButton, {
            [styles.active]: createType === definition.nodes.Text
          })}
          TagName='button'
          onClick={() => manager.setCreatorType(definition.nodes.Text)}
        >
          <TextIcon width={20} height={20} />
        </Touchable>

        <BuilderFloatBarCollection
          className={cn(styles.actionButton, {
            [styles.active]: createType === definition.nodes.Collection
          })}
          isActive={createType === definition.nodes.Collection}
          onSelectSource={sourceLink => manager.setCreatorType(definition.nodes.Collection, { sourceLink })}
        />

        <div className={styles.delimiter} />

        <Button mode='outline' onClick={openPreview}>
          Preview
        </Button>
        <Dropdown className={styles.publishDropdown} disabled trigger='click' options={<BuilderFragmentPublish />}>
          <Button glowing onClick={saveFragment}>
            Save
          </Button>
        </Dropdown>
      </div>
    </div>
  )
}
