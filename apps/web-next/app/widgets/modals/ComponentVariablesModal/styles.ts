import styled from 'styled-components'
import Modal from '../../../components/Modal/Modal'
import ModalContainer from '../../../components/ModalContainer/ModalContainer'
import Icon from '../../../components/Icon/Icon'
import InputSelectComponentProperty from '../../../components/InputSelectComponentProperty/InputSelectComponentProperty'

interface Props {
  isActive?: boolean
}

export const Root = styled(Modal)`
  width: 620px;
  height: 440px;
  max-height: calc(100vh - 160px);
`

export const Container = styled(ModalContainer).attrs({ bodyClassName: 'body' })`
  height: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;

  .body {
    display: flex;
    flex-direction: column;
    margin-bottom: 0;
  }
`

export const Head = styled.div`
  min-height: 52px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondaryLight};
  padding: 0 15px;
`

export const Title = styled.div`
  ${({ theme }) => theme.typography.text_12_16};
  font-weight: 600;
`

export const Body = styled.div`
  display: flex;
  flex: 1;
  height: calc(100% - 52px);
`

export const List = styled.div`
  flex-basis: 250px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.baseStyles.paddings.gutterMobileInset};
  border-right: 1px solid ${({ theme }) => theme.colors.secondaryLight};
  padding: ${({ theme }) => theme.baseStyles.paddings.gutterMobile};
  overflow: auto;
`

export const Item = styled(InputSelectComponentProperty)<Props>`
  background: ${({ theme, isActive }) => (isActive ? theme.colors.background : theme.colors.backgroundLight)};
`

export const ItemIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.textColorLight};
`

export const Fields = styled.div`
  flex-basis: 370px;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.baseStyles.paddings.gutterMobile};
`
