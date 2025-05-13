import { FC, useState } from 'react'
import { isValue } from '@fragmentsx/utils'
import cn from 'classnames'
import styles from './styles.module.css'
import { useGraph } from '@graph-state/react'
import { POPOUT_TYPE, popoutsStore } from '@/shared/store/popouts.store'
import { Panel } from '@/shared/ui/Panel'
import { Textarea } from '@/shared/ui/Textarea'
import { InputText } from '@/shared/ui/InputText'
import { Button } from '@/shared/ui/Button'

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
  const [popout] = useGraph(popoutsStore, `${POPOUT_TYPE}:cssOverride`)
  const selfContext = popout?.context
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
