import { ComponentType, ReactNode, Suspense } from 'react'

export const withSuspense =
  <TProps,>(WrappedComponent: ComponentType<TProps>, fallback?: ReactNode | ((props: TProps) => ReactNode)) =>
  (props: TProps) => {
    const Fallback = typeof fallback === 'function' ? fallback(props) : fallback

    return (
      <Suspense fallback={Fallback}>
        <WrappedComponent {...(props as any)} />
      </Suspense>
    )
  }
