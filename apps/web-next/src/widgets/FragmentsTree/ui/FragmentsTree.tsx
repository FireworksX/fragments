'use client'
import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { FragmentTreeHeader } from '@/features/FragmentTreeHeader'
import { FragmentsTreeItem } from '@/features/FragmentTreeItem'
import { useFragmentsTree } from '../hooks/useFragmentsTree'
import { Link } from '@/shared/ui/Link'
import { useParams } from 'next/navigation'
import { Container } from '@/shared/ui/Container'

interface FragmentsTreeProps {
  className?: string
}

export const FragmentsTree: FC<FragmentsTreeProps> = ({ className }) => {
  const { projectSlug } = useParams()
  const { handleCreateFragment, list } = useFragmentsTree()

  return (
    <Container className={cn(styles.root, className)} mode='hug' data-testid='FragmentsNav'>
      <FragmentTreeHeader onCreate={handleCreateFragment} />

      <div className={styles.body}>
        {list.map(fragment => (
          <Link type='fragmentPreview' projectSlug={projectSlug} fragmentSlug={fragment.id}>
            <FragmentsTreeItem name={fragment.name}></FragmentsTreeItem>
          </Link>
        ))}
      </div>
    </Container>
  )
}