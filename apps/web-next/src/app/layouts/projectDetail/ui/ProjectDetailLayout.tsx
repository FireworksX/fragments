import { useParams } from 'next/navigation'
import { HeaderSubNav } from '@/widgets/HeaderSubNav/subNav'
import { Link } from '@/shared/ui/Link/ui/Link'
import { HeaderSubNavCell } from '@/widgets/HeaderSubNav/subNavCell'
import { FC, PropsWithChildren } from 'react'

export const ProjectDetailLayout: FC<PropsWithChildren> = ({ children }) => {
  const { fragment, projectSlug } = useParams()
  const isFragmentView = !!fragment
  const [fragmentSlug, fragmentView] = fragment || []

  return (
    <main>
      {!isFragmentView && (
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
      )}

      {children}
    </main>
  )
}
