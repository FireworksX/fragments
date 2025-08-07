import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { ResponsiveContainer, Sankey, Tooltip } from 'recharts'
import { NodeProps } from 'recharts/types/chart/Sankey'

interface AreaChartFlowProps {
  className?: string
}

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

export const AreaChartFlow: FC<AreaChartFlowProps> = ({ className, data }) => {
  return (
    <ResponsiveContainer width={1000} height={320}>
      <Sankey
        sort={false}
        data={data}
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
  )
}
