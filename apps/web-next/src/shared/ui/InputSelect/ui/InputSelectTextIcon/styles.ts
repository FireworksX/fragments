import styled from 'styled-components'

export const Root = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.textColorLight};
`
