import { FC, useContext } from 'react'
import * as Styled from './styles'
import { ModalContext } from 'src/routes/BuilderRoute/ModalContext'
import ModalContainer from '../../../components/ModalContainer/ModalContainer'
import Button from '../../../components/Button/Button'
import InputText from '../../../components/InputText/InputText'
import SelectMimicry from '../../../components/SelectMimicry/SelectMimicry'
import DropdownGroup from '../../../components/Dropdown/components/DropdownGroup/DropdownGroup'
import DropdownOption from '../../../components/Dropdown/components/DropdownOption/DropdownOption'

interface CreateLandingModalProps {
  className?: string
}

const NAME = 'createLanding'

const CreateLandingModal: FC<CreateLandingModalProps> = ({ className }) => {
  const { name, close } = useContext(ModalContext)

  return (
    <Styled.Root className={className} isOpen={name === NAME}>
      <ModalContainer
        title='Create Landing'
        footer={
          <>
            <Button mode='secondary' stretched onClick={close}>
              Cancel
            </Button>
            <Button stretched>Create</Button>
          </>
        }
      >
        <Styled.Body>
          <InputText placeholder='Name' />

          <Styled.TemplateDropdown
            placement='bottom-start'
            options={
              <Styled.TemplateDropdownOptions>
                <DropdownGroup>
                  <DropdownOption>Simple popup</DropdownOption>
                  <DropdownOption>Complex popup</DropdownOption>
                  <DropdownOption>Express popup</DropdownOption>
                  <DropdownOption>Simple gift</DropdownOption>
                  <DropdownOption>Complex gift</DropdownOption>
                  <DropdownOption>Wide</DropdownOption>
                </DropdownGroup>
              </Styled.TemplateDropdownOptions>
            }
          >
            <SelectMimicry>Clean template</SelectMimicry>
          </Styled.TemplateDropdown>

          <Styled.TemplateDropdown
            placement='bottom-start'
            options={
              <Styled.TemplateDropdownOptions>
                <DropdownGroup>
                  <DropdownOption>Header</DropdownOption>
                  <DropdownOption>Catfish</DropdownOption>
                  <DropdownOption>Popup</DropdownOption>
                  <DropdownOption>Sidebar bonuses</DropdownOption>
                  <DropdownOption>Custom</DropdownOption>
                </DropdownGroup>
              </Styled.TemplateDropdownOptions>
            }
          >
            <SelectMimicry>Area</SelectMimicry>
          </Styled.TemplateDropdown>
        </Styled.Body>
      </ModalContainer>
    </Styled.Root>
  )
}

export default CreateLandingModal
