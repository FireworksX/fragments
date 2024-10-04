import { FC, useContext } from 'react'
import * as Styled from './styles'
import Avatar from '../../Avatar/Avatar'
import BuilderControlRow from '../../../routes/BuilderRoute/widgets/BuilderControls/components/BuilderControlRow/BuilderControlRow'
import BuilderControlRowWide from '../../../routes/BuilderRoute/widgets/BuilderControls/components/BuilderControlRow/components/BuilderControlRowWide/BuilderControlRowWide'
import InputSelect from '../../../components/InputSelect/InputSelect'
import Button from '../../../components/Button/Button'
import { ModalContext } from '../../../routes/BuilderRoute/ModalContext'
import { useStore } from '@nanostores/react'
import { $statex, $templateKey } from '../../../store/builderRouterStore'
import ModalContainer from '../../../components/ModalContainer/ModalContainer'

interface TemplateInfoModalProps {
  className?: string
}

const NAME = 'aboutTemplate'

const TemplateInfoModal: FC<TemplateInfoModalProps> = ({ className }) => {
  const { name } = useContext(ModalContext)
  const statex = useStore($statex)
  const templateKey = useStore($templateKey)

  return (
    <Styled.Root className={className} isOpen={name === NAME}>
      <ModalContainer
        title='About template'
        footer={
          <>
            <Button mode='secondary' stretched>
              Show history
            </Button>
            <Button mode='secondary' stretched onClick={() => console.log(statex.deepResolve(templateKey))}>
              Debug
            </Button>
          </>
        }
      >
        <BuilderControlRow title='Author'>
          <BuilderControlRowWide>
            <InputSelect icon={<Avatar size={20} />}>Dmitry Seregin</InputSelect>
          </BuilderControlRowWide>
        </BuilderControlRow>
        <BuilderControlRow title='Updated at'>
          <BuilderControlRowWide>
            <InputSelect hasIcon={false}>27.01.2023</InputSelect>
          </BuilderControlRowWide>
        </BuilderControlRow>
        <BuilderControlRow title='Linked offers'>
          <BuilderControlRowWide>
            <InputSelect hasIcon={false}>offer 123</InputSelect>
            <InputSelect hasIcon={false}>offer 123</InputSelect>
            <InputSelect hasIcon={false}>offer 123</InputSelect>
          </BuilderControlRowWide>
        </BuilderControlRow>
      </ModalContainer>
    </Styled.Root>
  )
}

export default TemplateInfoModal
