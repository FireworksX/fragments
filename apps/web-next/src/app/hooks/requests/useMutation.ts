import useSWRMutation from 'swr/mutation'
import { axios } from '@/app/lib/axios'
import { usePathByType } from '@/app/hooks/requests/usePathByType'
import { RequestOption, RequestType } from '@/app/hooks/requests/requestConfig'

type MutationMethod = 'post' | 'delete' | 'put'

const fetcher = (url: string, data: any, method: MutationMethod = 'post') => axios[method](url, data)

interface UseMutationOptions {
  method?: MutationMethod
}

export const useMutation = <Type extends RequestType>(type: Type, options?: UseMutationOptions) => {
  const path = usePathByType(type, options)
  return useSWRMutation(path, (url: string, { arg }) => fetcher(url, arg, options?.method))
}
