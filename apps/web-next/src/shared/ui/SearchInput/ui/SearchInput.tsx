import { FC, ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Search from '@/shared/icons/search.svg'

interface SearchInputProps {
  value?: string
  prefix?: ReactNode
  mode?: 'primary' | 'tiny'
  size?: 'medium' | 'large'
  placeholder?: string
  className?: string
  onChange?: (value: string) => void
}

export const SearchInput: FC<SearchInputProps> = ({
  value,
  className,
  placeholder,
  prefix = <Search width={16} height={16} />,
  mode = 'primary',
  size = 'medium',
  onChange
}) => (
  <label className={cn(styles.root, className, styles[mode], styles[size])} data-testid='SearchInput'>
    <div className={styles.prefix}>{prefix}</div>
    <input
      className={styles.input}
      value={value}
      placeholder={placeholder}
      type='text'
      onChange={e => onChange?.(e?.target?.value)}
    />
  </label>
)
