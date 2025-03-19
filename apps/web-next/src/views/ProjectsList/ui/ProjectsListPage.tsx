import { redirect } from 'next/navigation'
import { useLink } from '@/shared/ui/Link'
import { useCurrentProjectsListSuspenseQuery } from '@/views/ProjectsList/queries/ProjectsList.generated'

export const ProjectsListPage = () => {
  const { data } = useCurrentProjectsListSuspenseQuery()
  const list = data?.project ?? []
  const createLink = useLink({ type: 'projectCreate' })
  const firstProjectLink = useLink({ type: 'project', projectSlug: list?.at?.(0)?.id })

  if (!list.length) {
    redirect(createLink.href)
  } else {
    redirect(firstProjectLink.href)
  }

  return null
}
