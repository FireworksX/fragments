import { Graph } from '@graph-state/core'
import { to } from '@react-spring/web'
import { toPx } from '@/app/utils/toPx'

export const useCornerStyles = (graph: Graph) => {
  const cornerRadius = graph.resolveField('cornerRadius')
  const topLeftRadius = graph.resolveField('topLeftRadius')
  const topRightRadius = graph.resolveField('topRightRadius')
  const bottomLeftRadius = graph.resolveField('bottomLeftRadius')
  const bottomRightRadius = graph.resolveField('bottomRightRadius')

  return {
    borderRadius: to(
      [cornerRadius, topLeftRadius, topRightRadius, bottomLeftRadius, bottomRightRadius],
      (radius, tl, tr, bl, br) => (!radius ? `${toPx(tl)} ${toPx(tr)} ${toPx(br)} ${toPx(bl)}` : toPx(radius))
    )
  }
}
