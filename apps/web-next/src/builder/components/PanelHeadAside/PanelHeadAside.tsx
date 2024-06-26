import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Touchable from '@/app/components/Touchable'
import Minus from '@/app/svg/minus.svg'
import Plus from '@/app/svg/plus.svg'

interface BuilderPanelHeadAsideProps {
  isOpen?: boolean
  className?: string
  onClick?: () => void
}

const PanelHeadAside: FC<BuilderPanelHeadAsideProps> = ({ className, isOpen, onClick }) => {
  return (
    <Touchable className={cn(styles.root, className)} TagName='button' onClick={onClick}>
      {isOpen ? <Minus width={14} height={14} /> : <Plus width={14} height={14} />}
    </Touchable>
  )
}

export default PanelHeadAside
