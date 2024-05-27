import styled from 'styled-components'
import Touchable from '../../../../components/Touchable/Touchable'

export const Root = styled.div`
  display: flex;
  gap: 100px;
`

export const CreateVariant = styled(Touchable).attrs({ tagName: 'button' })`
  padding: 30px 50px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  ${({ theme }) => theme.typography.text_12_16};
  font-weight: bold;
  border-radius: ${({ theme }) => theme.baseStyles.radius.radiusMain};
  color: ${({ theme }) => theme.colors.secondary};
  white-space: nowrap;
`
