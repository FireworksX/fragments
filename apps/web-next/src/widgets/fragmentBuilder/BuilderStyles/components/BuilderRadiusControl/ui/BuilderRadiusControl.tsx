import { FC, memo, useMemo, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { ControlRow } from '@/shared/ui/ControlRow'
import { InputNumber } from '@/shared/ui/InputNumber'
import { Stepper } from '@/shared/ui/Stepper'
import { TabsSelector } from '@/shared/ui/TabsSelector'
import { BuilderStylesCorners } from '@/features/fragmentBuilder/BuilderStylesCorners'
import { fromPx } from '@/shared/utils/fromPx'
import Rectangle from '@/shared/icons/rectangle.svg'
import { CornerSides } from '@/shared/ui/CornerSides'
import { toPx } from '@/shared/utils/toPx'

interface BuilderRadiusControlProps {
  className?: string
}

export const BuilderRadiusControl: FC<BuilderRadiusControlProps> = memo(({ className }) => {
  const [value, setValue, valueInfo] = useLayerValue('borderRadius')
  const [cornerMode, setCornerMode] = useState('plain')
  const [cornerSide, setCornerSide] = useState<number | undefined>()
  const borderRadiusSides = value?.split(' ')?.map(fromPx)
  const borderRadiusSideByIndex = useMemo(() => {
    if (cornerSide === 0) return 'top'
    if (cornerSide === 1) return 'right'
    if (cornerSide === 2) return 'bottom'
    if (cornerSide === 3) return 'left'
  }, [cornerSide])

  const setCornerSideValue = (sideIndex, value) => {
    borderRadiusSides[sideIndex] = value
    setValue(borderRadiusSides.map(toPx).join(' '))
  }

  const setCornerModeProxy = mode => {
    if (mode === 'sides') {
      const radius = value ?? '0px'
      setValue([radius, radius, radius, radius].join(' '))
    } else {
      const radius = value?.split(' ')?.at(0) ?? '0px'
      setValue(radius)
    }

    setCornerMode(mode)
  }

  return (
    <>
      <ControlRow
        className={className}
        title='Radius'
        override={{
          isOverride: valueInfo.isOverride,
          onRestOverride: valueInfo.resetOverride
        }}
      >
        <InputNumber value={fromPx(value)} empty={cornerMode === 'sides'} onChange={v => setValue(toPx(v))} />
        <TabsSelector
          cellClassName={styles.cell}
          items={[
            {
              name: 'plain',
              label: <Rectangle width={10} height={10} />
            },
            {
              name: 'sides',
              label: <CornerSides side={borderRadiusSideByIndex} />
            }
          ]}
          value={cornerMode}
          onChange={({ name }) => setCornerModeProxy(name)}
        />
      </ControlRow>
      {cornerMode === 'sides' && (
        <BuilderStylesCorners
          values={borderRadiusSides}
          focusCorner={setCornerSide}
          onChange={(side, value) => setCornerSideValue(side, value)}
        />
      )}
    </>
  )
})
