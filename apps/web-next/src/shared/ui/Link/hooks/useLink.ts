import { useParams, usePathname } from 'next/navigation'
import { linkConfig, LinkType } from '@/shared/ui/Link/lib/linkConfig'

interface UseLinkOptions extends Record<string, unknown> {
  type: LinkType
}

export const useLink = ({ type, ...inputLinkParams }: UseLinkOptions) => {
  const routerParams = useParams()
  const linkEntity = linkConfig[type]
  const linkParams = linkEntity.params.reduce((acc, param) => {
    let routerParam = routerParams[param]
    if (param === 'fragmentSlug' && param in routerParams) {
      routerParam = routerParams[param].at(0)
    }
    acc[param] = inputLinkParams[param] ?? routerParam
    return acc
  }, {})

  const href = typeof linkEntity.path === 'function' ? linkEntity.path(linkParams) : linkEntity.path
  const pathname = usePathname()
  const isActive = pathname === href

  return {
    isActive,
    href
  }
}
