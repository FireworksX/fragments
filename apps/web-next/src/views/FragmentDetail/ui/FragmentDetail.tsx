import { FC } from 'react'
import { Container } from '@/shared/ui/Container'
import { FragmentsTree } from '@/widgets/FragmentsTree'
import CreateFragmentModal from '../../../../app/widgets/modals/CreateFragmentModal/CreateFragmentModal'

export const FragmentDetail: FC = () => {
  return (
    <Container withVertical mode='hug'>
      <FragmentsTree />
      <CreateFragmentModal />
    </Container>
  )
}
