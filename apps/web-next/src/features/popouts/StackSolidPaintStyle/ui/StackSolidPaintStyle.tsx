import { ComponentRef, ElementRef, FC, useContext, useEffect, useRef, useState } from 'react'
import { Color } from 'react-color'
import cn from 'classnames'
import styles from './styles.module.css'
import { Panel } from '@/shared/ui/Panel'
import { ColorPicker } from '@/shared/ui/ColorPicker'
import { InputText } from '@/shared/ui/InputText'
import { popoutNames } from '@/shared/data'
import { Button } from '@/shared/ui/Button'
import { objectToColorString } from '@fragmentsx/utils'
import { useStack } from '@/shared/hooks/useStack'

export type StackPanelColorEntity = { name: string; color: Color }

export interface StackSolidPaintStyleContext {
  name?: string
  defaultValue?: string
  initialColor?: Color
  onSubmit?: (color: StackPanelColorEntity) => void
}

interface StackPanelCreateColorProps {
  className?: string
}

const StackSolidPaintStyle: FC<StackPanelCreateColorProps> = ({ className }) => {
  const stack = useStack()
  const context = stack.readContext(popoutNames.stackSolidPaintStyle)
  const nameRef = useRef<ComponentRef<'input'>>(null)
  const [name, setName] = useState('')
  const [color, setColor] = useState('#000')

  useEffect(() => {
    if (context) {
      !!context?.name && setName(context?.name)
      !!context?.defaultValue && setColor(context?.defaultValue)
    }
  }, [context])

  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.body}>
        <InputText inputRef={nameRef} placeholder='Color name' value={name} onChangeValue={setName} />
        <Panel>
          <ColorPicker
            color={color}
            onChange={({ rgb }) => {
              setColor(objectToColorString(rgb))
            }}
          />
        </Panel>
        <Button
          stretched
          disabled={!name?.length}
          onClick={() => {
            context?.onSubmit?.({
              ...context,
              name,
              defaultValue: color
            })
            stack.goPrev()
          }}
        >
          Save
        </Button>
      </div>
    </div>
  )
}

export default StackSolidPaintStyle
