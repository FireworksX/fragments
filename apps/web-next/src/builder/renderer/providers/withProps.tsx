import { useGraph } from '@graph-state/react'
import { FC, useContext } from 'react'
import { Graph } from '@graph-state/core'
import { BuilderContext } from '@/builder/BuilderContext'

export const withProps = (Component: FC) => {
  return (props: Graph) => {
    const { documentManager } = useContext(BuilderContext)
    const [node] = useGraph(documentManager, props)
    const children = node?.children?.map?.(documentManager.resolve) ?? []
    const resultNode = {
      ...props,
      ...node,
      children
    }

    return <Component {...resultNode} />
  }
}
