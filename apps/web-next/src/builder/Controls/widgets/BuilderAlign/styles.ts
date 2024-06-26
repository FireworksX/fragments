import styled from 'styled-components'
import Touchable from 'src/components/Touchable/Touchable'
import Panel from '@/app/builder/widgets/Builder/components/Panel/Panel'

interface Props {
  disabled?: boolean
}

export const Root = styled(Panel).attrs({ bodyClassName: 'body' })`
  .body {
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 0;
  }
`

export const AlignButton = styled(Touchable).attrs({ tagName: 'button' })<Props>`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme, disabled }) => (disabled ? theme.colors.secondary : theme.colors.primary)};
`
