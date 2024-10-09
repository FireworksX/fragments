import { useGraph } from '@graph-state/react'
import { FC, useContext } from 'react'
import { Graph } from '@graph-state/core'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useStyles } from './styles'

export const withStyle = (Component: FC) => {
  return (props: Graph) => {
    const { documentManager } = useContext(BuilderContext)
    useGraph(documentManager, props)
    const children = props?.children?.map?.(documentManager.resolve) ?? []
    const style = useStyles(props)

    const resultNode = {
      ...props,
      // ...node,
      style,
      children
    }

    return <Component {...resultNode} />
  }
}
