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
import { BuilderSizePositionControl } from '@/widgets/fragmentBuilder/BuilderSize/components/BuilderSizePositionControl'

interface BuilderSizeProps {
  className?: string
}

const BuilderSize: FC<BuilderSizeProps> = ({ className }) => {
  const {
    aspectRatio,
    hugContentEnabled,
    fillContentEnabled,
    widthType,
    heightType,
    width,
    height,
    isAllowResizeWidth,
    isAllowResizeHeight,
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
      {!aspectRatio.disabled && (
        <div className={styles.lockerWrapper}>
          <BuilderSizeLocker isLocked={aspectRatio.isActive} onClick={aspectRatio.toggle} />
        </div>
      )}

      {!canRelativeSize && <BuilderSizePositionControl />}
      <ControlRow
        title='Width'
        override={{
          isOverride: width.info.isOverride || widthType.info.isOverride,
          onRestOverride: () => {
            width.info.resetOverride()
            widthType.info.resetOverride()
          }
        }}
      >
        <InputNumber value={width.value} disabled={!isAllowResizeWidth} onChange={width.update} />
        <Select value={widthType.value} onChange={widthType.update}>
          {Options}
        </Select>
      </ControlRow>
      <ControlRow
        title='Height'
        override={{
          isOverride: height.info.isOverride || heightType.info.isOverride,
          onRestOverride: () => {
            height.info.resetOverride()
            heightType.info.resetOverride
          }
        }}
      >
        <InputNumber value={height.value} disabled={!isAllowResizeHeight} onChange={height.update} />
        <Select value={heightType.value} onChange={heightType.update}>
          {Options}
        </Select>
      </ControlRow>
    </Panel>
  )
}

export default BuilderSize
