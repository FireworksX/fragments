import styled from 'styled-components'
import Modal from 'src/components/Modal/Modal'
import Dropdown from 'src/components/Dropdown/Dropdown'

export const Root = styled(Modal)`
  width: 250px;
`

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const TemplateDropdown = styled(Dropdown)`
  width: 100%;
`

export const TemplateDropdownOptions = styled.div`
  width: 230px;
`
