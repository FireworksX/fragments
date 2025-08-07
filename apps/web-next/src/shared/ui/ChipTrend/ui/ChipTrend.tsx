import { FC } from 'react'
import ArrowUp from '@/shared/icons/next/arrow-up.svg'
import ArrowDown from '@/shared/icons/next/arrow-down.svg'
import Equal from '@/shared/icons/next/equal-approximately.svg'
import { Chip } from '@/shared/ui/Chip'
import { ChipProps } from '@/shared/ui/Chip/ui/Chip'
import { Trend } from '@/__generated__/types'

interface ChipTrendProps extends ChipProps {
  trend: Trend
}

const modeByTrend: Record<Trend, Exclude<ChipProps['mode'], undefined>> = {
  [Trend.Down]: 'danger',
  [Trend.Flat]: 'gray',
  [Trend.Up]: 'success'
}

const IconByTrend: Record<Trend, FC<any>> = {
  [Trend.Down]: ArrowDown,
  [Trend.Flat]: Equal,
  [Trend.Up]: ArrowUp
}

export const ChipTrend: FC<ChipTrendProps> = ({ trend = Trend.Flat, children, ...chipProps }) => {
  const Icon = IconByTrend?.[trend] ?? null

  return (
    <Chip mode={modeByTrend[trend]} prefix={<Icon width={10} height={10} />} {...chipProps}>
      {children}
    </Chip>
  )
}
