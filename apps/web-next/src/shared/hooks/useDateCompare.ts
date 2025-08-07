import { useMemo } from 'react'
import dayjs from 'dayjs'

export type CompareInterval = 'today' | 'yesterday' | 'week' | 'month'

const FORMAT = 'YYYY-MM-DD HH:mm:ss'

export const useDateCompare = (interval: CompareInterval) =>
  useMemo(() => {
    const now = dayjs()

    let fromTs: string
    let toTs: string
    let prevFromTs: string
    let prevToTs: string

    if (interval === 'today') {
      fromTs = now.startOf('day').format(FORMAT)
      toTs = now.format(FORMAT)

      prevFromTs = now.subtract(1, 'day').startOf('day').format(FORMAT)
      prevToTs = now.subtract(1, 'day').endOf('day').format(FORMAT)
    } else if (interval === 'yesterday') {
      fromTs = now.subtract(1, 'day').startOf('day').format(FORMAT)
      toTs = now.subtract(1, 'day').endOf('day').format(FORMAT)

      prevFromTs = now.subtract(2, 'day').startOf('day').format(FORMAT)
      prevToTs = now.subtract(2, 'day').endOf('day').format(FORMAT)
    } else if (interval === 'week') {
      fromTs = now.subtract(7, 'day').format(FORMAT)
      toTs = now.format(FORMAT)

      prevFromTs = now.subtract(14, 'day').format(FORMAT)
      prevToTs = now.subtract(7, 'day').format(FORMAT)
    } else if (interval === 'month') {
      fromTs = now.subtract(30, 'day').format(FORMAT)
      toTs = now.format(FORMAT)

      prevFromTs = now.subtract(60, 'day').format(FORMAT)
      prevToTs = now.subtract(30, 'day').format(FORMAT)
    }

    return { fromTs, toTs, prevFromTs, prevToTs }
  }, [interval])
