import { FC, useState } from 'react'
import { Color } from 'react-color'
import cn from 'classnames'
import styles from './styles.module.css'
import { useStore } from '@nanostores/react'
import Panel from '@/app/builder/widgets/Builder/components/Panel/Panel'
import InputText from '@/app/components/InputText/InputText'
import ColorPicker from '@/app/builder/widgets/Builder/components/ColorPicker/ColorPicker'
import Button from '@/app/components/Button'

export type StackPanelColorEntity = { name: string; color: Color }

export interface StackPanelCreateColorOptions {
  initialColor?: Color
  onSubmit?: (color: StackPanelColorEntity) => void
}

interface StackPanelCreateColorProps extends StackPanel {
  className?: string
}

const StackPanelCreateColor: FC<StackPanelCreateColorProps> = ({ className }) => {
  const selfContext = {} //useStore($getContextPopout('createColor'))
  const [color, setColor] = useState<Color>(selfContext?.initialColor || createColor())
  const [name, setName] = useState('')

  return (
    <div className={cn(styles.root, className)}>
      <div>
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
            selfContext?.onSubmit &&
              selfContext.onSubmit({
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
