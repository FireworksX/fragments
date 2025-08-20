import { FC, PropsWithChildren, ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { InfoSectionHeader } from '@/components/InfoSection/components/InfoSectionHeader'
import { ChipTrend } from '@/shared/ui/ChipTrend'
import { DisplayNumber } from '@/shared/ui/DisplayNumber'
import { calcTrendDiff } from '@/shared/utils/charts/calcTrendDiff'
import { TabsSelector } from '@/shared/ui/TabsSelector'
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { InfoSection } from '@/components/InfoSection'
import { Trend } from '@/__generated__/types'
import ChartIcon from '@/shared/icons/next/chart-spline.svg'
import FlowIcon from '@/shared/icons/next/chart-network.svg'
import { DisplayNumberProps } from '@/shared/ui/DisplayNumber/ui/DisplayNumber'

interface AreaChartSectionProps extends PropsWithChildren {
  title: string
  description?: string
  className?: string
  bodyClassName?: string
  value?: number
  trend?: Trend
  trendValue?: ReactNode
  chart?: 'chart' | 'flow'
  format?: DisplayNumberProps['format']
  onChangeChart?: (value: unknown) => void
}

const items = [
  { label: <ChartIcon />, name: 'chart' },
  { label: <FlowIcon />, name: 'flow' }
]

export const AreaChartSection: FC<AreaChartSectionProps> = ({
  className,
  bodyClassName,
  title,
  format,
  description,
  value,
  trend,
  trendValue,
  chart,
  children,
  onChangeChart
}) => {
  return (
    <InfoSection
      className={cn(styles.root, className)}
      bodyClassName={cn(bodyClassName, styles.body)}
      colorMode='inverse'
      header={
        <InfoSectionHeader
          title={
            <>
              {title}
              <ChipTrend size='s' trend={trend}>
                <DisplayNumber format={format}>{trendValue}</DisplayNumber>
              </ChipTrend>
            </>
          }
          description={description}
          aside={
            !!value && (
              <>
                <DisplayNumber className={styles.value} styled format={format}>
                  {value}
                </DisplayNumber>
              </>
            )
          }
        />
      }
    >
      <TabsSelector
        className={styles.tabsSelector}
        cellClassName={styles.tabsSelectorCell}
        items={items}
        value={chart}
        onChange={({ name }) => onChangeChart(name)}
      />

      {children}
    </InfoSection>
  )
}
