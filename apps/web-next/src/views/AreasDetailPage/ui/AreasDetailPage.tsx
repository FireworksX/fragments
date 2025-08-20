'use client'
import { FC } from 'react'
import styles from './styles.module.css'
import FragmentIcon from '@/shared/icons/next/component.svg'
import { AnalyticsValueInfo } from '@/views/AreasDetailPage/components/AnalyticsValueInfo'
import { CurrentFragmentPreview } from '@/views/AreasDetailPage/components/CurrentFragmentPreview'
import { CurrentExperimentPreview } from '@/views/AreasDetailPage/components/CurrentExperimentPreview'
import { IntegrationMissMatch } from '@/views/AreasDetailPage/components/IntegrationMissMatch/ui/IntegrationMissMatch'
import { PeriodSelector } from '@/shared/ui/PeriodSelector'
import cn from 'classnames'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Sankey,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { InfoSection } from '@/components/InfoSection'
import { InfoSectionHeader } from '@/components/InfoSection/components/InfoSectionHeader'
import { SelectMimicry } from '@/shared/ui/SelectMimicry'
import { Dropdown } from '@/shared/ui/Dropdown'
import ArrowUp from '@/shared/icons/next/arrow-up.svg'
import ArrowDown from '@/shared/icons/next/arrow-down.svg'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import { DropdownOption } from '@/shared/ui/DropdownOption'
import { AnalyticsRating } from '@/views/AreasDetailPage/components/AnalyticsRating'
import { CommonLogo } from '@/shared/ui/CommonLogo'
import { TabsSelector } from '@/shared/ui/TabsSelector'
import { Chip } from '@/shared/ui/Chip'
import { NodeProps } from 'recharts/types/chart/Sankey'
import { AreaVisitorsStatistics } from '@/views/AreasDetailPage/widgets/AreaVisitorsStatistics'
import { AreaConversionStatistics } from '@/views/AreasDetailPage/widgets/AreaConversionStatistics'

interface CampaignDetailPageProps {}

const resultData = [
  {
    timestamp: 100,
    areaId: 1,
    campaingId: 1,
    variantId: 1,
    value: 10
  },
  {
    timestamp: 200,
    areaId: 1,
    campaingId: 2,
    variantId: 3,
    value: 35
  },
  {
    timestamp: 300,
    areaId: 1,
    campaingId: 2,
    variantId: 3,
    value: 4
  }
]

const data = [
  { xAxis: '00:01', value: 80 },
  { xAxis: '00:02', value: 30 },
  { xAxis: '00:03', value: 20 }
]

const data0 = {
  nodes: [
    { name: 'Area' },
    { name: 'Campaign 1' },
    { name: 'Campaign 2' },
    { name: 'Variant A' },
    { name: 'Variant B' }
  ],
  links: [
    { source: 0, target: 1, value: 100 },
    { source: 1, target: 2, value: 40 },
    { source: 1, target: 3, value: 30 },
    { source: 1, target: 4, value: 30 }
  ]
}

const pagesData = [
  { label: '/ru', value: 43 },
  { label: '/ru/sportbooks', value: 30 },
  { label: '/ru/predictions', value: 11 },
  { label: '/en', value: 20 },
  { label: '/en/trends', value: 7 }
]

const countriesData = [
  { label: 'Russia', value: 43, iso: 'ru' },
  { label: 'USA', value: 30, iso: 'us' },
  { label: 'Portugal', value: 11, iso: 'pt' },
  { label: 'Peru', value: 20, iso: 'pe' },
  { label: 'Australia', value: 7, iso: 'au' }
]

const items = [
  { label: 'Chart', name: 'chart' },
  { label: 'Flow', name: 'flow' }
]

const colors = ['#3C898E', '#486DF0', '#6F50E5']

const CustomNode = (props: NodeProps): React.ReactElement => {
  return (
    <rect
      x={props.x + 4}
      y={props.y - 2}
      width={8}
      height={props.height + 4}
      fill={colors[props.payload.depth % colors.length]}
      rx={2.5}
    />
  )
}

const CustomLink = (props: {
  sourceX: number
  targetX: number
  sourceY: number
  targetY: number
  sourceControlX: number
  targetControlX: number
  sourceRelativeY: number
  targetRelativeY: number
  linkWidth: number
  index: number
  payload: CustomLinkPayload
}) => {
  return (
    <g>
      <path
        d={`
  M${props.sourceX},${props.sourceY}
  C${props.sourceControlX},${props.sourceY} ${props.targetControlX},${props.targetY} ${props.targetX},${props.targetY}`}
        fill='none'
        stroke={colors[props.payload.source.depth % colors.length]}
        strokeOpacity={0.4}
        strokeWidth={props.linkWidth}
        strokeLinecap='butt'
      />
      <foreignObject
        x={props.sourceX}
        y={props.targetY - props.linkWidth / 2}
        width={Math.max(props.targetX, props.sourceX) - Math.min(props.targetX, props.sourceX)}
        height={props.linkWidth}
        style={{ overflow: 'visible' }}
      >
        <div
          style={{
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: '100%',
            height: '100%',
            overflow: 'visible',
            padding: '0.5em',
            gap: 8
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontFamily: 'sans-serif',
              textAlign: 'center',
              backgroundColor: '#f1f5fe80',
              padding: '0.25em 0.5em',
              borderRadius: 4,
              position: 'relative',
              zIndex: 1
            }}
          >
            {props.payload.target.name ? `${props.payload.target.name}: ` : ''}
            {props.payload.value}
            &nbsp;€
          </div>
        </div>
      </foreignObject>
    </g>
  )
}

export const AreasDetailPage: FC<CampaignDetailPageProps> = () => {
  return (
    <div className={styles.root}>
      <div className={styles.body}>
        <IntegrationMissMatch className={cn(styles.integration, styles.wide)} />

        <PeriodSelector className={styles.wide} period='today' onChange={() => undefined}>
          <Dropdown
            trigger='click'
            placement='bottom-end'
            hideOnClick
            arrow={false}
            options={
              <DropdownGroup>
                <DropdownOption>Varaint A</DropdownOption>
                <DropdownOption>Varaint B</DropdownOption>
              </DropdownGroup>
            }
          >
            <SelectMimicry icon={<FragmentIcon />}>Select variant</SelectMimicry>
          </Dropdown>
        </PeriodSelector>

        {/*<AnalyticsValueInfo className={styles.valueInfoWidget} title='Impression' trend={12} dynamic='+256'>*/}
        {/*  14.688*/}
        {/*</AnalyticsValueInfo>*/}
        {/*<AnalyticsValueInfo className={styles.valueInfoWidget} title='Conversion Avg' trend={3}>*/}
        {/*  5.31%*/}
        {/*</AnalyticsValueInfo>*/}

        {/*<AnalyticsValueInfo className={styles.valueInfoWidget} title='Revenue' trend={12} dynamic='+$812'>*/}
        {/*  $12,432*/}
        {/*</AnalyticsValueInfo>*/}

        <AreaVisitorsStatistics className={styles.wide} bodyClassName={styles.graphContainer} />

        <AreaConversionStatistics className={styles.wide} bodyClassName={styles.graphContainer} />

        <AnalyticsRating
          className={styles.part}
          title='Pages'
          description='Pages which render this area'
          data={pagesData}
        />

        <AnalyticsRating
          className={styles.part}
          title='Countries'
          description='Top countries which visit this area'
          data={countriesData}
          renderLabel={item => (
            <div className={styles.countryAnalyticsLabel}>
              <CommonLogo size={20} iso={item.iso} />
              {item.label}
            </div>
          )}
        />

        <AnalyticsRating
          className={styles.short}
          title='Browsers'
          data={countriesData}
          renderLabel={item => (
            <div className={styles.countryAnalyticsLabel}>
              <CommonLogo size={20} iso={item.iso} />
              {item.label}
            </div>
          )}
        />

        <AnalyticsRating
          className={styles.short}
          title='Operating Systems'
          data={countriesData}
          renderLabel={item => (
            <div className={styles.countryAnalyticsLabel}>
              <CommonLogo size={20} iso={item.iso} />
              {item.label}
            </div>
          )}
        />

        <AnalyticsRating
          className={styles.short}
          title='Devices'
          data={countriesData}
          renderLabel={item => (
            <div className={styles.countryAnalyticsLabel}>
              <CommonLogo size={20} iso={item.iso} />
              {item.label}
            </div>
          )}
        />
      </div>
    </div>
  )
}
