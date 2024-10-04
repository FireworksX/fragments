import { useGraph } from '@graph-state/react'
import { FC, useContext } from 'react'
import { Graph } from '@graph-state/core'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useStyles } from './styles'

export const withStyle = (Component: FC) => {
  return (props: Graph) => {
    const { documentManager } = useContext(BuilderContext)
    const [node] = useGraph(documentManager, props)
    const children = node?.children?.map?.(documentManager.resolve) ?? []
    const style = useStyles(node)

    if (node?._id === 'laptop') {
      // console.log(node, children)
    }

    const resultNode = {
      ...props,
      ...node,
      style,
      children
    }

    return <Component {...resultNode} />
  }
}
