import { FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useBuilderSize } from '../hooks/useBuilderSize'
import { Panel } from '@/shared/ui/Panel'
import { BuilderSizeLocker } from '@/features/fragmentBuilder/BuilderSizeLocker'
import { ControlRow } from '@/shared/ui/ControlRow'
import { InputNumber } from '@/shared/ui/InputNumber'
import { Select } from '@/shared/ui/Select'
import { sizing } from '@fragments/plugin-state'
import { to } from '@react-spring/web'

interface BuilderSizeProps {
  className?: string
}

const DISABLE_UTILS: (keyof typeof sizing)[] = [sizing.Fill, sizing.Hug]

const BuilderSize: FC<BuilderSizeProps> = ({ className }) => {
  const {
    selectionGraph,
    hugContentEnabled,
    fillContentEnabled,
    sync,
    isSynced,
    layoutSizingHorizontal,
    layoutSizingVertical,
    hasSync,
    width,
    height,
    allowResizeHorizontal,
    allowResizeVertical
  } = useBuilderSize()

  const Options = (
    <>
      <option value={sizing.Relative}>Rel</option>
      <option value={sizing.Fixed}>Fixed</option>
      <option value={sizing.Hug} disabled={!hugContentEnabled}>
        Hug
      </option>
      <option value={sizing.Fill} disabled={!fillContentEnabled}>
        Fill
      </option>
    </>
  )

  return (
    <Panel className={cn(styles.root, className)} title='Size & Position'>
      {hasSync && (
        <div className={styles.lockerWrapper}>
          <BuilderSizeLocker isLocked={isSynced} onClick={sync.onChange} />
        </div>
      )}

      <ControlRow title='Width' actions={width.actions} isHighlight={width.isOverride}>
        <InputNumber {...width} disabled={to(allowResizeHorizontal, v => !v)} />
        <Select {...layoutSizingHorizontal}>{Options}</Select>
      </ControlRow>
      <ControlRow title='Height' actions={height.actions} isHighlight={height.isOverride}>
        <InputNumber {...height} disabled={to(allowResizeVertical, v => !v)} />
        <Select {...layoutSizingVertical}>{Options}</Select>
      </ControlRow>
    </Panel>
  )
}

export default BuilderSize
