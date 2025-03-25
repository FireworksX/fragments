import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Button } from '@/shared/ui/Button'
import { usePreviewSandboxProps } from '../hooks/usePreviewSandboxProps'
import { Dropdown } from '@/shared/ui/Dropdown'
import InstancePropertyGeneric from '../../../../fragmentBuilder/BuilderFragmentInstance/ui/components/InstancePropertyGeneric/ui/InstancePropertyGeneric'
import { Panel } from '@/shared/ui/Panel'

interface PreviewSandboxPropsProps {
  fragmentId: number
  props: Record<string, unknown>
  className?: string
  onChange?: (nextProps: Record<string, unknown>) => void
}

export const PreviewSandboxProps: FC<PreviewSandboxPropsProps> = ({ className, fragmentId, props, onChange }) => {
  const { manager, definitions } = usePreviewSandboxProps(fragmentId, props, onChange)

  return (
    <div className={cn(styles.root, className)}>
      <Dropdown
        trigger='click'
        placement='bottom-start'
        arrow={false}
        options={
          <Panel className={styles.content} title='Edit Props'>
            {definitions.map(def => (
              <InstancePropertyGeneric
                value={def.value}
                property={def.link}
                manager={manager}
                onChange={def.setValue}
              />
            ))}
          </Panel>
        }
      >
        <Button mode='outline'>Edit props</Button>
      </Dropdown>
    </div>
  )
}
