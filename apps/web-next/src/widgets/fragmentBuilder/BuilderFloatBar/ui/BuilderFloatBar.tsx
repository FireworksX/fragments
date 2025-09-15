import React, { FC, useContext, useState } from 'react'
import SparklesIcon from '@/shared/icons/next/sparkles.svg'
import { animated } from '@react-spring/web'
import { useGraph } from '@graph-state/react'
import styles from './styles.module.css'
import DefaultCursor from '@/shared/icons/next/mouse-pointer.svg'
import GrabCursor from '@/shared/icons/next/hand.svg'
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
import { useBuilderAutoCreator } from '@/shared/hooks/fragmentBuilder/useBuilderAutoCreator'
import { TabsSelector, TabsSelectorItem } from '@/shared/ui/TabsSelector'
import { Tabs } from '@/shared/ui/Tabs'
import { TabItem } from '@/shared/ui/TabItem'
import { builderCanvasMode as defCanvasMode } from '@/shared/constants/builderConstants'
import { promiseWaiter } from '@fragmentsx/utils'
import { BuilderFloatBarInfo } from '@/widgets/fragmentBuilder/BuilderFloatBar/widgets/BuilderFloatBarInfo'
import { useBuilderCanvasField } from '@/shared/hooks/fragmentBuilder/useBuilderCanvasField'

interface BuilderFloatBarProps {
  className?: string
}

export const BuilderFloatBar: FC<BuilderFloatBarProps> = ({ className }) => {
  const { openPreview } = useBuilder()
  const { saveFragment, isSaving, savingState } = useBuilderDocument()
  const [canvasMode, setCanvasMode] = useBuilderCanvasField('canvasMode')
  const [_, setCanvasModeContext] = useBuilderCanvasField('canvasModeContext')

  const items = [
    {
      name: defCanvasMode.select,
      label: <DefaultCursor width={20} height={20} />
    },
    {
      name: [defCanvasMode.pan, defCanvasMode.panning],
      label: <GrabCursor width={20} height={20} />,
      value: defCanvasMode.pan
    },
    {
      name: defCanvasMode.Frame,
      label: <FrameIcon width={20} height={20} />
    },
    {
      name: defCanvasMode.Text,
      label: <TextIcon width={20} height={20} />
    },
    {
      name: defCanvasMode.Image,
      label: <ImageIcon width={20} height={20} />
    },
    {
      name: defCanvasMode.Collection,
      disabled: true,
      node: (
        <BuilderFloatBarCollection
          className={cn(styles.actionButton, {
            [styles.active]: canvasMode === defCanvasMode.Collection
          })}
          isActive={canvasMode === defCanvasMode.Collection}
          onSelectSource={sourceLink => {
            setCanvasModeContext({ sourceLink })
            setCanvasMode(defCanvasMode.Collection)
          }}
        />
      )
    }
  ]

  return (
    <div className={styles.root}>
      <BuilderFloatBarInfo isSaving={isSaving} savingState={savingState} />

      <div className={styles.body}>
        <Tabs>
          {items.map(
            item =>
              item?.node ?? (
                <TabItem
                  isActive={Array.isArray(item.name) ? item.name.includes(canvasMode) : canvasMode === item.name}
                  className={cn(styles.actionButton)}
                  icon={item.label}
                  onClick={() => setCanvasMode(item.value ?? item.name)}
                />
              )
          )}
        </Tabs>

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
