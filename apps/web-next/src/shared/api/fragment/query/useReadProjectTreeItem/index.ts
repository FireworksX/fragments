import { projectItemType } from '@/widgets/ProjectTree/hooks/useProjectTree'
import { useFragment } from '@apollo/client'
import { FolderTreeItemFragmentDoc } from '@/shared/api/fragment/query/useReadProjectTreeItem/ProjectTreeItemFolderFragment.generated'
import { FragmentTreeItemFragmentDoc } from '@/shared/api/fragment/query/useReadProjectTreeItem/ProjectTreeItemFragmentFragment.generated'

interface UseReadProjectTreeItemOptions {
  id: number
  type: keyof typeof projectItemType
}

export const useReadProjectTreeItem = (item: UseReadProjectTreeItemOptions) => {
  const __typename = item.type === projectItemType.directory ? 'ProjectDirectoryGet' : 'FragmentGet'

  const { data } = useFragment({
    fragment: item.type === projectItemType.fragment ? FragmentTreeItemFragmentDoc : FolderTreeItemFragmentDoc,
    from: `${__typename}:${item.id}`
  })

  return data
}
