import { useCallback, useState } from 'react'
import { axios } from '@/shared/api/axios'
import { requestType } from '@/shared/hooks/requests/requestConfig'
import { useUploadAssetMutation } from '@/shared/hooks/useUploadFile/queries/UploadAssetMutation.generated'
import { MediaType } from '@/__generated__/types'

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
  const [progress, setProgress] = useState(0)
  const [mockData, setMockData] = useState('')
  const [uploadAsset, { data, loading }] = useUploadAssetMutation()

  const onUpload = useCallback(
    async (file: File) => {
      // const res = await uploadAsset({
      //   variables: {
      //     file,
      //     type: MediaType.FragmentAsset
      //   }
      // })

      setMockData('https://cdn.scores24.live/upload/team/w60-h60/621/2e4/ae04abc5c947467e81e702ff0c7682b709.png')
      // console.log(res)
    },
    // trigger({
    //   file,
    //   onUpdateProgress: setProgress
    // })
    [uploadAsset]
  )

  return {
    progress,
    loading,
    onUpload,
    data: mockData
  }
}
