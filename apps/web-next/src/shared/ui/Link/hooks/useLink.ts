import { useParams, usePathname } from 'next/navigation'
import { linkConfig, LinkType } from '@/shared/ui/Link/lib/linkConfig'

interface UseLinkOptions extends Record<string, unknown> {
  type: LinkType
  partial?: boolean
}

interface BuilderLinkOptions extends UseLinkOptions {
  routerParams: Record<string, unknown>
  pathname: string
}

export const buildLink = ({ type, routerParams, pathname, ...inputLinkParams }: BuilderLinkOptions) => {
  const linkEntity = linkConfig[type]
  const linkParams = linkEntity?.params?.reduce((acc, param) => {
    let routerParam = routerParams[param]
    if (param === 'fragmentSlug' && param in routerParams) {
      routerParam = routerParams[param].at(0)
    }
    acc[param] = inputLinkParams[param] ?? routerParam
    return acc
  }, {})

  const href = typeof linkEntity?.path === 'function' ? linkEntity.path(linkParams) : linkEntity.path
  let isActive = pathname === href
  if (inputLinkParams.partial && !isActive) {
    isActive = pathname.startsWith(href)
  }

  return {
    isActive,
    href
  }
}

export const useLink = (options: UseLinkOptions) => {
  const routerParams = useParams()
  const pathname = usePathname()

  return buildLink({ ...options, pathname, routerParams })
}
