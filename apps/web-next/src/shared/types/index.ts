export interface DispatchValue<T> {
  value: T
  onChange: (value: T) => void
}

interface SplineChartNestedPoint {
  value: number
  [key: string]: unknown
}

export interface SplineChartPoint {
  time: number
  formatTime: string
  value: number
  prevValue: number
  nested?: Record<string, SplineChartNestedPoint>
}
