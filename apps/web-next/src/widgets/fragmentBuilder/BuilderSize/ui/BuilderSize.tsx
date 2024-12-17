import { FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useBuilderSize } from '../hooks/useBuilderSize'
import { Panel } from '@/shared/ui/Panel'
import { BuilderSizeLocker } from '@/features/fragmentBuilder/BuilderSizeLocker'
import { ControlRow } from '@/shared/ui/ControlRow'
import { InputNumber } from '@/shared/ui/InputNumber'
import { Select } from '@/shared/ui/Select'
import { sizing } from '@fragments/plugin-fragment-spring'
import { AnimatedVisible } from '@/shared/ui/AnimatedVisible'
import { to } from '@fragments/springs-factory'

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
    allowResizeVertical,
    top,
    left,
    canRelativeSize
  } = useBuilderSize()

  const Options = (
    <>
      <option value={sizing.Relative} disabled={!canRelativeSize}>
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
    <Panel className={cn(styles.root, className)} title={canRelativeSize ? 'Size' : 'Size & Position'}>
      <AnimatedVisible visible={hasSync}>
        <div className={styles.lockerWrapper}>
          <BuilderSizeLocker isLocked={isSynced} onClick={sync.onChange} />
        </div>
      </AnimatedVisible>

      {!canRelativeSize && (
        <ControlRow title='Position'>
          <InputNumber suffix='x' value={left.value} min={Infinity} max={Infinity} onChange={left.onChange} />
          <InputNumber suffix='y' value={top.value} min={Infinity} max={Infinity} onChange={top.onChange} />
        </ControlRow>
      )}
      <ControlRow title='Width' actions={width.actions} isHighlight={width.isHighlight}>
        <InputNumber value={width.value} disabled={allowResizeHorizontal} onChange={width.onChange} />
        <Select {...layoutSizingHorizontal}>{Options}</Select>
      </ControlRow>
      <ControlRow title='Height' actions={height.actions} isHighlight={height.isHighlight}>
        <InputNumber value={height.value} disabled={allowResizeVertical} onChange={height.onChange} />
        <Select {...layoutSizingVertical}>{Options}</Select>
      </ControlRow>
    </Panel>
  )
}

export default BuilderSize
