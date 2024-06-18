import { requestConfig, RequestOption, RequestType } from '@/app/hooks/requests/requestConfig'

export const usePathByType = <Type extends RequestType>(type: Type, options: RequestOption<Type>) => {
  const entity = requestConfig[type]
  const path = typeof entity === 'function' ? entity(options as any) : entity

  return path
}
