import styled from 'styled-components'

export const Root = styled.div`
  position: relative;
  width: 100%;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background: ${({ theme }) => theme.colors.primary};
  }

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: -3px;
    width: 8px;
    height: 8px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
  }
`
