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
    relativeContentEnabled,
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
    allowResizeVertical,
    top,
    left,
    canRelativeSize
  } = useBuilderSize()

  const Options = (
    <>
      <option value={sizing.Relative} disabled={!relativeContentEnabled}>
        Rel
      </option>
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

      {!canRelativeSize && (
        <ControlRow title='Position'>
          <InputNumber suffix='x' {...left} min={Infinity} max={Infinity} />
          <InputNumber suffix='y' {...top} min={Infinity} max={Infinity} />
        </ControlRow>
      )}
      <ControlRow title='Width' actions={width.actions} isHighlight={width.isHighlight}>
        <InputNumber {...width} disabled={to(allowResizeHorizontal, v => !v)} />
        <Select {...layoutSizingHorizontal}>{Options}</Select>
      </ControlRow>
      <ControlRow title='Height' actions={height.actions} isHighlight={height.isHighlight}>
        <InputNumber {...height} disabled={to(allowResizeVertical, v => !v)} />
        <Select {...layoutSizingVertical}>{Options}</Select>
      </ControlRow>
    </Panel>
  )
}

export default BuilderSize
