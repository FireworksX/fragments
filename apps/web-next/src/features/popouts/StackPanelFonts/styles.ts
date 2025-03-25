import styled, { css } from 'styled-components'
import BuilderPanel from 'src/routes/BuilderRoute/components/BuilderPanel/BuilderPanel'
import Touchable from '../../../../components/Touchable/Touchable'

interface Props {
  isActive?: boolean
}

export const Root = styled(BuilderPanel)``

export const FontCell = styled(Touchable).attrs({ tagName: 'button' })<Props>`
  height: 30px;
  display: flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.baseStyles.radius.radiusSecond};
  transition: ${({ theme }) => theme.animation.transitionDuration};
  padding: 0 10px;
  ${({ theme }) => theme.typography.text_12_16};
  ${({ theme }) => theme.typography.textEllipsis};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }

  ${({ theme, isActive }) =>
    isActive &&
    css`
      background-color: ${theme.colors.background};
      color: ${theme.colors.primary};
    `}
`
