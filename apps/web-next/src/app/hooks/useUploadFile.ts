import { useCallback, useState } from 'react'
import useSWRMutation from 'swr/mutation'
import { axios } from '@/app/lib/axios'
import { usePathByType } from '@/app/hooks/requests/usePathByType'
import { requestType } from '@/app/hooks/requests/requestConfig'

const uploadMethod = async (url: string, { arg }) => {
  const file = arg.file

  const formData = new FormData()
  formData.append('file', file)

  return await axios
    .post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: progressEvent =>
        arg.onUpdateProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total))
    })
    .then(res => res.data)
}

export const useUploadFile = () => {
  const apiPath = usePathByType(requestType.projectsUploadLogo)
  const [progress, setProgress] = useState(0)
  const { trigger, data, isMutating } = useSWRMutation(apiPath, uploadMethod)

  const onUpload = useCallback(
    (file: File) =>
      trigger({
        file,
        onUpdateProgress: setProgress
      }),
    [trigger]
  )

  return {
    progress,
    fetching: isMutating,
    onUpload,
    data
  }
}
