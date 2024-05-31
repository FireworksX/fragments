import { FC, useState } from 'react'
import { Color } from 'react-color'
import cn from 'classnames'
import styles from './styles.module.css'
import { useStore } from '@nanostores/react'
import Panel from '@/app/builder/widgets/Builder/components/Panel/Panel'
import InputText from '@/app/components/InputText/InputText'
import ColorPicker from '@/app/builder/widgets/Builder/components/ColorPicker/ColorPicker'
import Button from '@/app/components/Button'
import { useGraph } from '@graph-state/react'
import { POPOUT_TYPE, popoutsStore } from '@/app/stories/popouts.store'
import { StackPanel } from '@/app/builder/widgets/Builder/widgets/StackCollector/hooks/useStackCollector'
import { createColor } from '@fragments/fragments-plugin'

export type StackPanelColorEntity = { name: string; color: Color }

export interface StackPanelCreateColorOptions {
  initialColor?: Color
  onSubmit?: (color: StackPanelColorEntity) => void
}

interface StackPanelCreateColorProps extends StackPanel {
  className?: string
}

const StackPanelCreateColor: FC<StackPanelCreateColorProps> = ({ className }) => {
  const [popout] = useGraph(popoutsStore, `${POPOUT_TYPE}:createColor`)
  const context = popout?.context
  const [color, setColor] = useState<Color>(context?.initialColor || createColor())
  const [name, setName] = useState('')

  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.body}>
        <InputText placeholder='Color name' value={name} onChange={setName} />
        <Panel>
          <ColorPicker
            color={color}
            onChange={color => {
              setColor(color?.rgb)
            }}
          />
        </Panel>
        <Button
          stretched
          disabled={name.length === 0 || !color}
          onClick={() => {
            context?.onSubmit &&
              context.onSubmit({
                name,
                color
              })
          }}
        >
          Create
        </Button>
      </div>
    </div>
  )
}

export default StackPanelCreateColor
