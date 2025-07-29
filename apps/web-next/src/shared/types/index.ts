export interface DispatchValue<T> {
  value: T
  onChange: (value: T) => void
}
