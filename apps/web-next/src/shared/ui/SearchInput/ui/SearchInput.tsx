import { FC, ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Search from '@/shared/icons/search.svg'

interface SearchInputProps {
  prefix?: ReactNode
  mode?: 'primary' | 'tiny'
  size?: 'medium' | 'large'
  placeholder?: string
  className?: string
}

export const SearchInput: FC<SearchInputProps> = ({
  className,
  placeholder,
  prefix = <Search width={16} height={16} />,
  mode = 'primary',
  size = 'medium'
}) => (
  <label className={cn(styles.root, className, styles[mode], styles[size])} data-testid='SearchInput'>
    <div className={styles.prefix}>{prefix}</div>
    <input className={styles.input} placeholder={placeholder} type='text' />
  </label>
)
