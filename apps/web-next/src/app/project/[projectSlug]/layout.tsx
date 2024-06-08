'use client'
import AsideBar from '@/app/project/[projectSlug]/widgets/AsideBar/AsideBar'
import { HeaderSubNav } from '@/app/project/widgets/HeaderSubNav/HeaderSubNav'
import { HeaderSubNavCell } from '@/app/project/widgets/HeaderSubNav/components/HeaderSubNavCell/HeaderSubNavCell'
import { useParams } from 'next/navigation'

export default function ({ children }) {
  const { fragmentSlug } = useParams()
  const isFragmentView = !!fragmentSlug

  return (
    <main>
      <HeaderSubNav>
        {isFragmentView ? (
          <>
            <HeaderSubNavCell isActive>Fragment</HeaderSubNavCell>
            <HeaderSubNavCell>Preview</HeaderSubNavCell>
            <HeaderSubNavCell>Integrations</HeaderSubNavCell>
            <HeaderSubNavCell>Analytics</HeaderSubNavCell>
            <HeaderSubNavCell>Settings</HeaderSubNavCell>
          </>
        ) : (
          <>
            <HeaderSubNavCell isActive>Overview</HeaderSubNavCell>
            <HeaderSubNavCell>Fragments</HeaderSubNavCell>
            <HeaderSubNavCell>Campaigns</HeaderSubNavCell>
            <HeaderSubNavCell>Settings</HeaderSubNavCell>
          </>
        )}
      </HeaderSubNav>

      {children}
    </main>
  )
}
