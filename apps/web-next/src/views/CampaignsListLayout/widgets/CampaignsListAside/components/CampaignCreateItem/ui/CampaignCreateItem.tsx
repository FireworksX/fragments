import { ComponentRef, FC, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import PlusIcon from '@/shared/icons/next/plus.svg'
import { Touchable } from '@/shared/ui/Touchable'
import { InputText } from '@/shared/ui/InputText'
import { noop } from '@fragments/utils'
import { Button } from '@/shared/ui/Button'
import useClickOutside from '@/shared/hooks/useClickOutside'

interface CampaignCreateItemProps {
  className?: string
  onCreate?: (name: string) => void
}

export const CampaignCreateItem: FC<CampaignCreateItemProps> = ({ className, onCreate }) => {
  const itemRef = useRef<ComponentRef<'form'>>(null)
  const [name, setName] = useState('')
  const [creating, setCreating] = useState(false)
  const Tag = !creating ? Touchable : 'form'
  const inputRef = useRef<ComponentRef<'input'>>(null)
  useClickOutside({ ref: itemRef, onClickOutside: () => setCreating(false) })

  useEffect(() => {
    if (creating) {
      inputRef?.current?.focus()
    } else {
      setName('')
    }
  }, [creating])

  const onSubmit = e => {
    e.preventDefault()
    e.stopPropagation()

    onCreate?.(name)
    setCreating(false)
  }

  return (
    <Tag
      ref={itemRef}
      className={cn(styles.root, className)}
      onSubmit={onSubmit}
      onClick={creating ? noop : () => setCreating(true)}
    >
      <div className={styles.before}>
        <PlusIcon />
      </div>
      {creating ? (
        <>
          <InputText ref={inputRef} placeholder='Campaign Name' value={name} onChangeValue={setName} />
          <Button disabled={name?.length < 3} mode='success' type='submit'>
            Create
          </Button>
        </>
      ) : (
        <span>Create New</span>
      )}
    </Tag>
  )
}
