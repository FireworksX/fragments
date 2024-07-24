'use client'
import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useTheme } from 'styled-components'
import Touchable from '@/app/components/Touchable'
import { animated } from '@react-spring/web'

interface BuilderSizeLockerProps {
  isLocked?: boolean
  className?: string
  onClick?: (newValue: boolean) => void
}

const BuilderSizeLocker: FC<BuilderSizeLockerProps> = ({ className, isLocked, onClick }) => {
  return (
    <Touchable
      TagName='button'
      effect='none'
      className={cn(styles.root, className, { [styles.active]: isLocked })}
      onClick={() => onClick && onClick(!isLocked)}
    >
      <svg xmlns='http://www.w3.org/2000/svg' width='12' height='70'>
        <path
          d='M 5.75 22 L 5.75 18.75 C 5.75 17.093 7.093 15.75 8.75 15.75 L 11 15.75'
          fill='transparent'
          strokeWidth='1.5'
          stroke='var(--border)'
          strokeLinecap='round'
          strokeLinejoin='round'
        ></path>
        <path
          d='M 5.75 47.75 L 5.75 51 C 5.75 52.657 7.093 54 8.75 54 L 11 54'
          fill='transparent'
          strokeWidth='1.5'
          stroke='var(--border)'
          strokeLinecap='round'
          strokeLinejoin='round'
        ></path>
      </svg>
      <svg className={styles.lock} xmlns='http://www.w3.org/2000/svg' width='8' height='14'>
        <path d='M 0 7 L 8 7 L 8 10 C 8 11.105 7.105 12 6 12 L 2 12 C 0.895 12 0 11.105 0 10 Z' fill='currentColor' />
        <path
          className={styles.shackle}
          d='M 0.75 10 C 0.75 10 0.75 6.897 0.75 6 C 0.75 4.205 2.205 2.75 4 2.75 C 5.795 2.75 7.25 4.205 7.25 6 C 7.25 6.897 7.25 7 7.25 7'
          fill='transparent'
          strokeWidth='1.5'
          stroke='currentColor'
          strokeLinecap='round'
          strokeDasharray='15.211931228637695'
          strokeDashoffset={isLocked ? 0 : 4}
        />
      </svg>
    </Touchable>
  )
}

export default animated(BuilderSizeLocker)
