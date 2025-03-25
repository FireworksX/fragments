'use client'
import useSWR, { Key } from 'swr'
import { RequestOption, RequestType } from '@/shared/hooks/requests/requestConfig'
import { axios } from '@/shared/api/axios'
import { usePathByType } from '@/shared/hooks/requests/usePathByType'

interface UseRequestOptions<Type extends RequestType> {
  params?: RequestOption<Type>
  pause?: boolean
}

const fetcher = (url: string, queryParams?: any) => axios.get(url, { params: queryParams }).then(res => res.data)

export const useRequest = <Type extends RequestType>(type: Type, options?: UseRequestOptions<Type>) => {
  const path = usePathByType(type, options?.params)
  return useSWR(options?.pause ? null : [path, options?.params], ([url, params]) => fetcher(url, params))
}
