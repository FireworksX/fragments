'use client'
import { FC, ReactNode, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useBuilderSelection } from '@/app/builder/widgets/Builder/hooks/useBuilderSelection'
import Dropdown from '@/app/components/Dropdown/Dropdown'
import DropdownGroup from '@/app/components/Dropdown/components/DropdownGroup/DropdownGroup'
import DropdownOption from '@/app/components/Dropdown/components/DropdownOption/DropdownOption'
import Button from '@/app/components/Button'
import Touchable from '@/app/components/Touchable'
import SelectMimicry from '@/app/components/SelectMimicry/SelectMimicry'
import DefaultCursor from '@/app/svg/default-cursor.svg'
import GrabCursor from '@/app/svg/grab-cursor.svg'
import Lightning from '@/app/svg/lightning.svg'
import Variables from '@/app/svg/variables.svg'

type FloatinBarAction = 'zoomIn' | 'zoomOut' | 'publish' | 'addFrame' | 'addText' | 'variables'

interface BuilderFloatingBarProps {
  scale?: ReactNode
  className?: string
  onAction?: (action: FloatinBarAction) => void
}

const BuilderFloatingBar: FC<BuilderFloatingBarProps> = ({ className, scale, onAction }) => {
  const statex = {} //useStore($statex)
  const { selection } = useBuilderSelection()
  const node = null //useStatex(statex, selection)
  const builderView = '' //useStore($builderView)
  // const { open } = useContext(ModalContext)
  // const canAddLayer = [builderNodes.Frame, builderNodes.Screen, constants.ComponentVariant].some(
  //   type => type === node?._type
  // )

  const canAddLayer = true

  return (
    <div className={cn(styles.root, className)}>
      <Touchable TagName='button' className={styles.cell}>
        <DefaultCursor width={20} height={20} />
      </Touchable>
      <Touchable TagName='button' className={styles.cell}>
        <GrabCursor width={20} height={20} />
      </Touchable>
      <Dropdown
        trigger='click'
        options={
          <>
            <DropdownGroup>
              <DropdownOption onClick={() => open('aboutTemplate')}>About</DropdownOption>
            </DropdownGroup>
            <DropdownGroup>
              <DropdownOption disabled={!canAddLayer} onClick={() => onAction('addFrame')}>
                Add Frame
              </DropdownOption>
              <DropdownOption disabled={!canAddLayer} onClick={() => onAction('addText')}>
                Add Text
              </DropdownOption>
            </DropdownGroup>
          </>
        }
      >
        <Touchable TagName='button' className={styles.cell}>
          <Lightning width={20} height={20} />
        </Touchable>
      </Dropdown>

      {builderView === 'component' && (
        <Touchable TagName='button' className={styles.cell} onClick={() => onAction('variables')}>
          <Variables width={20} height={20} />
        </Touchable>
      )}
      <Dropdown
        options={
          <DropdownGroup>
            <DropdownOption onClick={() => onAction('zoomIn')}>Zoom In</DropdownOption>
            <DropdownOption onClick={() => onAction('zoomOut')}>Zoom Out</DropdownOption>
          </DropdownGroup>
        }
      >
        <SelectMimicry className={styles.scaleSelect}>{scale}%</SelectMimicry>
      </Dropdown>

      <div className={styles.delimiter} />
      <Button onClick={() => onAction('publish')}>Publish</Button>
    </div>
  )
}

export default BuilderFloatingBar
