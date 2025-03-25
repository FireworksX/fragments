import { FC, useContext, useState } from 'react'
import styles from './styles.module.css'
import { Panel } from '@/shared/ui/Panel'
import { Button } from '@/shared/ui/Button'
import { InputText } from '@/shared/ui/InputText'
import RemoveIcon from '@/shared/icons/next/close.svg'
import { useBuilderAttributes } from '../hooks/useBuilderAttributes'

interface BuilderAttributesProps {
  className?: string
}

const BuilderAttributes: FC<BuilderAttributesProps> = ({ className }) => {
  const [key, setKey] = useState('')
  const [value, setValue] = useState('')
  const { attributes, disabled, setAttribute, removeAttribute } = useBuilderAttributes()

  if (disabled) return null

  return (
    <Panel className={className} title='Attributes'>
      <div className={styles.list}>
        {Object.entries(attributes).map(([key, value]) => (
          <div key={key} className={styles.item}>
            <InputText placeholder='Key' value={key} onChangeValue={v => setAttribute(key, v)} />
            <InputText placeholder='Value' value={value} onChangeValue={v => setAttribute(value, v)} />
            <Button size='small' mode='tertiary-secondary' onClick={() => removeAttribute(key)}>
              <RemoveIcon />
            </Button>
          </div>
        ))}

        <div className={styles.item}>
          <InputText placeholder='Key' value={key} onChangeValue={setKey} />
          <InputText placeholder='Value' value={value} onChangeValue={setValue} />
        </div>
        <div className={styles.item}>
          <Button
            stretched
            mode='secondary'
            onClick={() => {
              if (key.length > 0 && value.length > 0) {
                setAttribute(key, value)
                setKey('')
                setValue('')
              }
            }}
          >
            Add
          </Button>
        </div>
      </div>
    </Panel>
  )
}

export default BuilderAttributes
