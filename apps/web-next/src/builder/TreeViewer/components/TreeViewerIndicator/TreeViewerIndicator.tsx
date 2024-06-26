import { FC } from 'react'
import * as Styled from './styles'

interface TreeViewerIndicatorProps {
  className?: string
}

const TreeViewerIndicator: FC<TreeViewerIndicatorProps> = ({ className }) => {
  return <Styled.Root className={className} />
}

export default TreeViewerIndicator
