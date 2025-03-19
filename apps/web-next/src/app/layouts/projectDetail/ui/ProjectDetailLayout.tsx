import { useParams, usePathname, useRouter } from 'next/navigation'
import { Link } from '@/shared/ui/Link/ui/Link'
import { FC, PropsWithChildren } from 'react'
import { Tabs } from '@/shared/ui/Tabs'
import { TabItem } from '@/shared/ui/TabItem'

export const ProjectDetailLayout: FC<PropsWithChildren> = ({ children }) => {
  const { fragmentSlug: fragmentSlugRouter, projectSlug } = useParams()
  const pathName = usePathname()
  const isFragmentView = !!fragmentSlugRouter || pathName.includes('/builder')

  return (
    <main>
      {!isFragmentView && (
        <Tabs>
          <Link type='project'>{({ isActive }) => <TabItem isActive={isActive}>Overview</TabItem>}</Link>
          <Link type='builder'>{({ isActive }) => <TabItem isActive={isActive}>Builder</TabItem>}</Link>
          <Link type='campaign'>{({ isActive }) => <TabItem isActive={isActive}>Campaigns</TabItem>}</Link>
          <Link type='projectSetting'>{({ isActive }) => <TabItem isActive={isActive}>Settings</TabItem>}</Link>
        </Tabs>
      )}

      {children}
    </main>
  )
}
