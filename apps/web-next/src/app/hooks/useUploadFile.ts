import { useCallback, useState } from 'react'
import useSWRMutation from 'swr/mutation'

const uploadMethod = async (url: string, { arg }) => {
  // const fetcher = serviceContainer().getService('apiClient')
  const file = arg.file

  const formData = new FormData()
  formData.append('image', file)

  // return await fetcher
  //   .post(url, formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     },
  //     onUploadProgress: progressEvent =>
  //       arg.onUpdateProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total))
  //   })
  //   .then(res => res.data)
}

export const useUploadFile = () => {
  const [progress, setProgress] = useState(0)
  const { trigger, data, isMutating } = useSWRMutation('', uploadMethod)

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
