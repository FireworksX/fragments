'use client'
import styles from './styles.module.css'
import { HeaderSubNav } from '@/app/project/widgets/HeaderSubNav/HeaderSubNav'
import { HeaderSubNavCell } from '@/app/project/widgets/HeaderSubNav/components/HeaderSubNavCell/HeaderSubNavCell'
import { useParams } from 'next/navigation'
import { Link } from '@/app/widgets/Link/Link'

export default function ({ children }) {
  const { fragment, projectSlug } = useParams()
  const isFragmentView = !!fragment
  const [fragmentSlug, fragmentView] = fragment || []

  return (
    <main>
      <HeaderSubNav>
        {isFragmentView ? (
          <>
            <Link type='fragmentPreview' projectSlug={projectSlug} fragmentSlug={fragmentSlug}>
              <HeaderSubNavCell isActive={!fragmentView}>Preview</HeaderSubNavCell>
            </Link>
            <Link type='fragmentEdit' projectSlug={projectSlug} fragmentSlug={fragmentSlug}>
              <HeaderSubNavCell isActive={fragmentView === 'edit'}>Edit</HeaderSubNavCell>
            </Link>
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
