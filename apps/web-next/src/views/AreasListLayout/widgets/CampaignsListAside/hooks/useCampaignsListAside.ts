import { useParams } from 'next/navigation'
import { generateId } from '@fragmentsx/utils'
import { useCreateAreaMutation } from '../queries/CreateArea.generated'
import { useAreasListQuery, useAreasListSuspenseQuery } from '../queries/AreasList.generated'
import { useAreasStatisticQuery } from '@/views/AreasListLayout/widgets/CampaignsListAside/queries/AreasStatistic.generated'
import { useMemo } from 'react'
import { useDateCompare } from '@/shared/hooks/useDateCompare'

export const useCampaignsListAside = () => {
  const { projectSlug } = useParams()
  const [createArea, { data: createdCampaign, loading: createCampaignLoading }] = useCreateAreaMutation()
  const { data: campaignsListData } = useAreasListSuspenseQuery({
    variables: {
      projectId: +projectSlug
    }
  })

  const dateCompare = useDateCompare('today')

  const { data: areasStatistic } = useAreasStatisticQuery({
    variables: {
      areaIds: campaignsListData?.area.map(el => el.id) ?? [],
      ...dateCompare
    },
    skip: !campaignsListData?.area.length
  })

  const resultList = useMemo(
    () =>
      campaignsListData?.area.map(area => ({
        ...area,
        statistic: areasStatistic?.areaStatistic?.find(el => el.areaId === area.id)
      })) ?? [],
    [campaignsListData, areasStatistic]
  )

  const handleCreate = async name => {
    await createArea({
      variables: {
        projectId: +projectSlug,
        name,
        areaCode: generateId()
      }
    })
  }

  return {
    list: resultList,
    handleCreate,
    createCampaignLoading
  }
}
