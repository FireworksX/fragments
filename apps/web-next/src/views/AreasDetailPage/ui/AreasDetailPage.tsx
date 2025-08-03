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
  { time: '10:00', value: 80, value2: 30 },
  { time: '11:00', value: 90, value2: 41 },
  { time: '12:00', value: 110, value2: 60 },
  { time: '13:00', value: 100, value2: 56 },
  { time: '14:00', value: 70, value2: 33 },
  { time: '15:00', value: 95, value2: 70 }
]

const data0 = {
  nodes: [
    { name: 'Начало' },
    { name: 'Промежуточный этап' },
    { name: 'Завершение A' },
    { name: 'Завершение B' },
    { name: 'Завершение C' }
  ],
  links: [
    { source: 0, target: 1, value: 100 }, // 100 единиц из "Начало" в "Промежуточный этап"
    { source: 1, target: 2, value: 40 }, // 40 единиц в "Завершение A"
    { source: 1, target: 3, value: 30 }, // 30 единиц в "Завершение B"
    { source: 1, target: 4, value: 30 } // 30 единиц в "Завершение C"
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

        <InfoSection
          className={styles.wide}
          bodyClassName={styles.graphContainer}
          colorMode='inverse'
          header={
            <InfoSectionHeader
              title='Visitors'
              description='Graph of visitiors on this area'
              aside={
                <>
                  <Chip mode='success' prefix={<ArrowUp />}>
                    12% vs yesterday
                  </Chip>
                  <TabsSelector
                    className={styles.tabsSelector}
                    cellClassName={styles.tabsSelectorCell}
                    items={items}
                    value='chart'
                  />
                </>
              }
            />
          }
        >
          <ResponsiveContainer width='100%' height={320}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray='0' stroke='rgba(var(--secondary--rgb), .3)' />
              <YAxis domain={['auto', 'auto']} stroke='var(--secondary)' />
              <XAxis dataKey='time' stroke='var(--secondary)' />
              <Tooltip />
              <Line type='monotone' dataKey='value' stroke='#8884d8' fill='url(#colorByValue)' fillOpacity={1} />
              <Line type='monotone' dataKey='value2' stroke='#8884d8' fill='url(#colorByValue)' fillOpacity={1} />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </InfoSection>

        <InfoSection
          className={styles.wide}
          bodyClassName={styles.graphContainer}
          colorMode='inverse'
          header={
            <InfoSectionHeader
              title='Conversion'
              description='Conversion of area'
              aside={
                <>
                  <Chip mode='danger' prefix={<ArrowDown />}>
                    -2% vs yesterday
                  </Chip>
                  <TabsSelector
                    className={styles.tabsSelector}
                    cellClassName={styles.tabsSelectorCell}
                    items={items}
                    value='flow'
                  />
                </>
              }
            />
          }
        >
          <ResponsiveContainer width='100%' height={320}>
            <Sankey
              sort={false}
              data={data0}
              node={CustomNode}
              link={CustomLink}
              nodePadding={50}
              margin={{
                left: 200,
                right: 200
              }}
            >
              <Tooltip />
            </Sankey>
          </ResponsiveContainer>
        </InfoSection>

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
