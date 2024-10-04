import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Minus from '@/shared/icons/minus.svg'
import Plus from '@/shared/icons/plus.svg'
import { animated } from '@react-spring/web'
import { Touchable } from '@/shared/ui/Touchable'

interface BuilderPanelHeadAsideProps {
  isOpen?: boolean
  className?: string
  onClick?: () => void
}

const PanelHeadAside: FC<BuilderPanelHeadAsideProps> = animated(({ className, isOpen, onClick }) => {
  return (
    <Touchable className={cn(styles.root, className)} TagName='button' onClick={onClick}>
      {isOpen ? <Minus width={14} height={14} /> : <Plus width={14} height={14} />}
    </Touchable>
  )
})

export default PanelHeadAside
