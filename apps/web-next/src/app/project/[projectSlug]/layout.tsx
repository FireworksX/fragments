'use client'
import styles from './styles.module.css'
import { HeaderSubNav } from '@/app/project/widgets/HeaderSubNav/HeaderSubNav'
import { HeaderSubNavCell } from '@/app/project/widgets/HeaderSubNav/components/HeaderSubNavCell/HeaderSubNavCell'
import { useParams } from 'next/navigation'
import { Link } from '@/app/widgets/Link/Link'

export default function ({ children }) {
  const { fragmentSlug, projectSlug } = useParams()
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
            <Link type='fragments' projectSlug={projectSlug}>
              <HeaderSubNavCell>Fragments</HeaderSubNavCell>
            </Link>

            <HeaderSubNavCell>Campaigns</HeaderSubNavCell>
            <HeaderSubNavCell>Settings</HeaderSubNavCell>
          </>
        )}
      </HeaderSubNav>

      {children}
    </main>
  )
}
