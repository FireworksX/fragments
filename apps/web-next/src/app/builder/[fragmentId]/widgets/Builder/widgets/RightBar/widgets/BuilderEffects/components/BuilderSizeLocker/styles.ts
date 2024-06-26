import styled from 'styled-components'
import Touchable from 'src/components/Touchable/Touchable'

interface Props {
  isActive?: boolean
}

export const Root = styled(Touchable).attrs({ tagName: 'button', effect: 'none' })`
  position: relative;
`

export const Lock = styled.svg<Props>`
  transition: ${({ theme }) => theme.animation.transitionDuration};
  color: ${({ theme, isActive }) => (isActive ? theme.colors.primary : theme.colors.border)};
  position: absolute;
  left: 2px;
  top: 50%;
  transform: translateY(-50%);
`

export const Shackle = styled.path<Props>`
  transform: translateY(${({ isActive }) => (isActive ? 0 : -1)}px);
`
