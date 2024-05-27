import { FC, useState } from 'react'
import { isValue } from '@adstore/utils'
import cn from 'classnames'
import styles from './styles.module.css'
import { StackPanel } from '../../hooks/useStackCollector'
import Panel from '@/app/builder/widgets/Builder/components/Panel/Panel'
import Textarea from '@/app/components/Textarea/Textarea'
import InputText from '@/app/components/InputText/InputText'
import Button from '@/app/components/Button'

export type StackPanelCssOverrideNew = { name: string; cssText: string }

export interface StackPanelCssOverrideOptions {
  name?: string
  value?: string
  submitButtonLabel?: string
  onChange?: (css: string) => void
  onSubmit?: (override: StackPanelCssOverrideNew) => void
}

interface StackPanelCssOverrideProps extends StackPanel {
  className?: string
}

const StackPanelCssOverride: FC<StackPanelCssOverrideProps> = ({ className }) => {
  const selfContext = {} //useStore($getContextPopout('cssOverride'))
  const [localCss, setLocalCss] = useState(selfContext?.value || '')
  const [localName, setLocalName] = useState(selfContext?.name || '')

  const onChange = (css: string) => {
    // $updateContextPopout('cssOverride', { value: css })
    selfContext?.onChange?.(css)
    setLocalCss(css)
  }

  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.body}>
        {isValue(selfContext?.name) && <InputText placeholder='Name' value={localName} onChange={setLocalName} />}
        <Panel>
          <Textarea value={localCss} onChange={onChange} />
        </Panel>

        {selfContext?.onSubmit && (
          <Button
            stretched
            disabled={localName.length === 0}
            onClick={() => selfContext?.onSubmit?.({ name: localName, cssText: localCss })}
          >
            {selfContext.submitButtonLabel ?? 'Create'}
          </Button>
        )}
      </div>
    </div>
  )
}

export default StackPanelCssOverride
