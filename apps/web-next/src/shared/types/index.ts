export interface DispatchValue<T> {
  value: T
  onChange: (value: T) => void
}

export interface SplineChartPoint {
  time: number
  formatTime: string
  value: number
  prevValue: number
}
