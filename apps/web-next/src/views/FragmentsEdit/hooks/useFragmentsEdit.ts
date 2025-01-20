import { useBuilderTabs } from '@/shared/hooks/fragmentBuilder/useBuilderTabs'

export const useFragmentsEdit = () => {
  const { activeTab } = useBuilderTabs()

  console.log(activeTab)
}
