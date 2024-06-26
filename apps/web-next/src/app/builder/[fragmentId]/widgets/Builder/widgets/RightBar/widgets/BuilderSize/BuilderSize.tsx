'use client'
import { FC, useContext } from 'react'
import { useStore } from '@nanostores/react'
import cn from 'classnames'
import styles from './styles.module.css'
import ControlRow from '@/app/builder/widgets/Builder/components/ControlRow/ControlRow'
import { useBuilderSize } from './hooks/useBuilderSize'
import BuilderSizeLocker from './components/BuilderSizeLocker/BuilderSizeLocker'
// import { builderSizing } from 'src/data/promos/creators'
// import { $statex } from 'src/store/builderRouterStore'
import Panel from '@/app/builder/widgets/Builder/components/Panel/Panel'
import InputNumber from '@/app/components/InputNumber/InputNumber'
import Select from '@/app/components/Select/Select'
import { builderNodes, builderSizing } from '@fragments/fragments-plugin'
import { BuilderContext } from '@/app/builder/widgets/Builder/BuilderContext'
import { isValue } from '@fragments/utils'

interface BuilderSizeProps {
  className?: string
}

const DISABLE_UTILS: (keyof typeof builderSizing)[] = [builderSizing.Fill, builderSizing.Hug]

const BuilderSize: FC<BuilderSizeProps> = ({ className }) => {
  const { selectionGraph, sync, layoutSizingHorizontal, layoutSizingVertical, hasSync, width, height } =
    useBuilderSize()

  if (![builderNodes.Frame, builderNodes.ComponentVariant].some(type => type === selectionGraph._type)) {
    return null
  }

  const Options = (
    <>
      <option value={builderSizing.Relative}>Rel</option>
      <option value={builderSizing.Fixed}>Fixed</option>
      <option value={builderSizing.Hug}>Hug</option>
      <option value={builderSizing.Fill}>Fill</option>
    </>
  )

  return (
    <Panel className={cn(styles.root, className)} title='Size'>
      {hasSync && (
        <div className={styles.lockerWrapper}>
          <BuilderSizeLocker isLocked={isValue(sync.value)} onClick={sync.onChange} />
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
