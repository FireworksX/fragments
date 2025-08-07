import { Detalization } from '@/__generated__/types'
import dayjs from '@/shared/lib/dayjs'

export const timeByDetailzation = (time: number, detalization: Detalization) => {
  switch (detalization) {
    case Detalization.Minute:
      return dayjs(time).format('HH:mm:ss')
    case '10min':
      return dayjs(time).format('HH:mm')
    case Detalization.Hour:
      return dayjs(time).format('HH:mm')
    case Detalization.Day:
      return dayjs(time).format('DD.MM HH:mm')
  }

  return dayjs(time).format('HH:mm')
}
