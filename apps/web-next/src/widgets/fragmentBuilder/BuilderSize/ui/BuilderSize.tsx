import { FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useBuilderSize } from '../hooks/useBuilderSize'
import { builderNodes, builderSizing } from '@fragments/fragments-plugin'
import { Panel } from '@/shared/ui/Panel'
import { BuilderSizeLocker } from '@/features/fragmentBuilder/BuilderSizeLocker'
import { ControlRow } from '@/shared/ui/ControlRow'
import { InputNumber } from '@/shared/ui/InputNumber'
import { Select } from '@/shared/ui/Select'

interface BuilderSizeProps {
  className?: string
}

const DISABLE_UTILS: (keyof typeof builderSizing)[] = [builderSizing.Fill, builderSizing.Hug]

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
    height
  } = useBuilderSize()

  const Options = (
    <>
      <option value={builderSizing.Relative}>Rel</option>
      <option value={builderSizing.Fixed}>Fixed</option>
      <option value={builderSizing.Hug} disabled={!hugContentEnabled}>
        Hug
      </option>
      <option value={builderSizing.Fill} disabled={!fillContentEnabled}>
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
        <InputNumber {...width} disabled={DISABLE_UTILS.includes(layoutSizingHorizontal.value)} />
        <Select {...layoutSizingHorizontal}>{Options}</Select>
      </ControlRow>
      <ControlRow title='Height' actions={height.actions} isHighlight={height.isOverride}>
        <InputNumber {...height} disabled={DISABLE_UTILS.includes(layoutSizingVertical.value)} />
        <Select {...layoutSizingVertical}>{Options}</Select>
      </ControlRow>
    </Panel>
  )
}

export default BuilderSize
