import { FC, ReactNode, useMemo } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { InfoSection } from '@/components/InfoSection'
import { InfoSectionHeader } from '@/components/InfoSection/components/InfoSectionHeader'
import { InfoSectionCellProgress } from '@/components/InfoSection/components/InfoSectionCellProgress/ui/InfoSectionCellProgress'
import { InfoSectionFooter } from '@/components/InfoSection/components/InfoSectionFooter'
import { Button } from '@/shared/ui/Button'
import { CommonLogo } from '@/shared/ui/CommonLogo'

interface Item {
  value: number
  label: string
}

interface AnalyticsRatingProps<T extends Item> {
  data: T[]
  renderLabel?: (item: T) => ReactNode
  title: string
  description?: string
  className?: string
  limit?: number
  onShowMore?: () => void
}

const calculateProgress = (arr: number[]) => {
  if (!arr || arr.length === 0) return [] // Проверка на пустой массив
  if (arr.every(num => num === 0)) return arr.map(() => 0) // Если все нули

  const max = Math.max(...arr) // Находим максимальное значение
  return arr.map(num => (Math.abs(num) / max) * 100) // Преобразуем в проценты
}

export const AnalyticsRating = <TItem extends Item>({
  className,
  data = [],
  title,
  limit = 5,
  description,
  renderLabel,
  onShowMore
}: AnalyticsRatingProps<TItem>) => {
  const resultList = useMemo(() => {
    const limitList = data.slice(0, limit)
    const sortList = limitList.toSorted((a, b) => b.value - a.value)
    const progressList = calculateProgress(sortList.map(el => el.value))

    return sortList.map((item, index) => ({
      ...item,
      progress: progressList.at(index)
    }))
  }, [data, limit])

  return (
    <InfoSection
      className={cn(styles.root, className)}
      colorMode='inverse'
      header={<InfoSectionHeader title={title} description={description} />}
      footer={
        <InfoSectionFooter aside={<Button mode='tertiary'>Show all</Button>}>Now show top 5 results.</InfoSectionFooter>
      }
    >
      {resultList.map(item => (
        <InfoSectionCellProgress
          key={item.label}
          progress={item.progress}
          label={renderLabel?.(item) ?? item.label}
          value={`${item.value}%`}
        />
      ))}
    </InfoSection>
  )
}
