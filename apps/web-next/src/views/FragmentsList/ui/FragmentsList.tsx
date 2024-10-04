import { FC } from 'react'
import { Container } from '@/shared/ui/Container'
import { FragmentsTree } from '@/widgets/FragmentsTree'
import { CreateFragmentModal } from '@/widgets/modals/CreateFragmentModal'

export const FragmentsList: FC = () => {
  return (
    <Container withVertical mode='hug'>
      <FragmentsTree />
      <CreateFragmentModal />
    </Container>
  )
}
