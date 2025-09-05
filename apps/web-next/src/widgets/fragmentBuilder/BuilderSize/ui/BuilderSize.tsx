import { FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useBuilderSize } from '../hooks/useBuilderSize'
import { Panel } from '@/shared/ui/Panel'
import { BuilderSizeLocker } from '@/features/fragmentBuilder/BuilderSizeLocker'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputNumber } from '@/shared/ui/InputNumber'
import { Select } from '@/shared/ui/Select'
import { definition } from '@fragmentsx/definition'
import { BuilderSizePositionControl } from '@/widgets/fragmentBuilder/BuilderSize/components/BuilderSizePositionControl'
import { InputSelect } from '@/shared/ui/InputSelect'
import { BuilderSizeMinMax } from '@/widgets/fragmentBuilder/BuilderSize/components/BuilderSizeMinMax'

interface BuilderSizeProps {
  className?: string
}

const BuilderSize: FC<BuilderSizeProps> = ({ className }) => {
  const {
    aspectRatio,
    canHugContentHeight,
    canHugContentWidth,
    fillContentEnabled,
    widthType,
    heightType,
    width,
    height,
    isAllowResizeWidth,
    isAllowResizeHeight,
    canRelativeSize
  } = useBuilderSize()

  const Options = (type: 'width' | 'height') => (
    <>
      <option value={definition.sizing.Relative} disabled={!canRelativeSize}>
        Rel (%)
      </option>
      <option value={definition.sizing.Fixed}>Fixed (px)</option>
      <option value={definition.sizing.Hug} disabled={!(type === 'width' ? canHugContentWidth : canHugContentHeight)}>
        Hug
      </option>
      <option value={definition.sizing.Fill} disabled={!fillContentEnabled}>
        Fill
      </option>
    </>
  )

  return (
    <Panel className={cn(styles.root, className)} title={canRelativeSize ? 'Size' : 'Size & Position'}>
      {!canRelativeSize && <BuilderSizePositionControl />}

      {!aspectRatio.disabled && (
        <div className={styles.lockerBody}>
          <div className={styles.lockerWrapper}>
            <BuilderSizeLocker isLocked={aspectRatio.isActive} onClick={aspectRatio.toggle} />
          </div>
        </div>
      )}
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
          {Options('width')}
        </Select>
      </ControlRow>
      <ControlRow
        title='Height'
        override={{
          isOverride: height.info.isOverride || heightType.info.isOverride,
          onRestOverride: () => {
            height.info.resetOverride()
            heightType.info.resetOverride()
          }
        }}
      >
        <InputNumber value={height.value} disabled={!isAllowResizeHeight} onChange={height.update} />
        <Select value={heightType.value} onChange={heightType.update}>
          {Options('height')}
        </Select>
      </ControlRow>

      <BuilderSizeMinMax />
    </Panel>
  )
}

export default BuilderSize
