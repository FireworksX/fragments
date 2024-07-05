import { useCallback, useState } from 'react'
import useSWRMutation from 'swr/mutation'
import { axios } from '@/app/lib/axios'
import { usePathByType } from '@/app/hooks/requests/usePathByType'
import { requestType } from '@/app/hooks/requests/requestConfig'

type UploadFileType = 'projectLogo' | 'projectAssets'

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

const fetchTypeMap = {
  projectLogo: requestType.projectsUploadLogo,
  projectAssets: requestType.projectsUploadAssets
}

export const useUploadFile = (type: UploadFileType = 'projectAssets') => {
  const apiPath = usePathByType(fetchTypeMap[type])
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
