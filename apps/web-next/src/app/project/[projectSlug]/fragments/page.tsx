'use client'
import { FragmentsNav } from '@/app/project/[projectSlug]/fragments/components/FragmentsNav/FragmentsNav'
import { Container } from '@/app/components/Container/Container'
import styles from './styles.module.css'
import { FragmentCard } from '@/app/project/[projectSlug]/fragments/components/FragmentCard/FragmentCard'
import CreateFragmentModal from '@/app/widgets/modals/CreateFragmentModal/CreateFragmentModal'
import { useFragments } from '@/app/project/[projectSlug]/fragments/hooks/useFragments'
import { Link } from '@/app/widgets/Link/Link'
import { useParams } from 'next/navigation'

export default function () {
  const { projectSlug } = useParams()
  const { list, handleCreateFragment } = useFragments()

  return (
    <Container className={styles.root} withVertical mode='hug'>
      <FragmentsNav onCreate={handleCreateFragment} />
      <ul className={styles.body}>
        {list.map(fragment => (
          <Link type='fragmentPreview' projectSlug={projectSlug} fragmentSlug={fragment.id}>
            <FragmentCard name={fragment.name} />
          </Link>
        ))}
      </ul>
      <CreateFragmentModal />
    </Container>
  )
}
