import { Detalization } from '@/__generated__/types'
import { timeByDetailzation } from '@/shared/utils/charts/timeByDetailzation'

interface Point {
  time: number // timestamp (ms)
  value: number
}

interface ChartPoint {
  time: number // start of interval
  formatTime: string // start of interval
  value: number // aggregated sum
  prevValue: number // aggregated sum
}

interface Input {
  from: number // timestamp in ms
  to: number // timestamp in ms
  detalization?: Detalization
  points: Point[]
}

interface Options {
  current: Input
  prev: Input
}

function getDetalizationInfo(detalization: Detalization) {
  switch (detalization) {
    case Detalization.Minute:
      return {
        interval: 60 * 1000,
        timeFormat: 'HH:mm:ss'
      }
    case '10min':
      return {
        interval: 10 * 60 * 1000,
        timeFormat: 'HH:mm'
      }
    case Detalization.Hour:
      return {
        interval: 60 * 60 * 1000,
        timeFormat: 'HH:mm'
      }
    case Detalization.Day:
      return {
        interval: 24 * 60 * 60 * 1000,
        timeFormat: 'DD.MM HH:mm'
      }
  }
}

export const buildChartDataWithCompare = ({ current, prev }: Options): ChartPoint[] => {
  if (!current || !current?.points) return []

  const intervalMs = getDetalizationInfo(current?.detalization)?.interval
  const { from, to, points } = current
  const { from: prevFrom, to: prevTo, points: prevPoints } = prev

  const start = Math.floor(from / intervalMs) * intervalMs
  const end = Math.ceil(to / intervalMs) * intervalMs

  const bucketCount = Math.floor((end - start) / intervalMs)
  const result: ChartPoint[] = []

  for (let i = 0; i <= bucketCount; i++) {
    const time = start + i * intervalMs
    result.push({
      time,
      formatTime: timeByDetailzation(time, current.detalization),
      value: 0,
      prevValue: 0
    })
  }

  for (const point of points) {
    const bucketIndex = Math.floor((point.time - start) / intervalMs)
    if (bucketIndex >= 0 && bucketIndex < result.length) {
      result[bucketIndex].value += point.value
    }
  }

  const prevOffset = from - prevFrom

  for (const point of prevPoints) {
    const alignedTime = point.time + prevOffset
    const bucketIndex = Math.floor((alignedTime - start) / intervalMs)
    if (bucketIndex >= 0 && bucketIndex < result.length) {
      result[bucketIndex].prevValue += point.value
    }
  }

  return result
}
