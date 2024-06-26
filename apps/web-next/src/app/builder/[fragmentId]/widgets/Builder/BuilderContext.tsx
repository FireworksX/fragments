import { createContext, FC, PropsWithChildren } from 'react'
import { createState, GraphState } from '@graph-state/core'
import { SpringRef, SpringValue, useSpringRef, useSpringValue } from '@react-spring/web'

interface BuilderContextValue {
  graphState: GraphState
  canvas?: {
    x: SpringValue<number>
    y: SpringValue<number>
    scale: SpringValue<number>
  }
}

export const BuilderContext = createContext<BuilderContextValue>({
  graphState: createState()
})

interface BuilderProviderProps extends PropsWithChildren {
  graphState: GraphState
}

export const BuilderProvider: FC<BuilderProviderProps> = ({ children, graphState }) => {
  return (
    <BuilderContext.Provider
      value={{
        graphState,
        canvas: {
          x: useSpringValue(0),
          y: useSpringValue(0),
          scale: useSpringValue(0)
        }
      }}
    >
      {children}
    </BuilderContext.Provider>
  )
}
