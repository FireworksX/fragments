import { ComponentRef, ElementRef, FC, useContext, useEffect, useRef, useState } from 'react'
import { Color } from 'react-color'
import cn from 'classnames'
import styles from './styles.module.css'
import { Panel } from '@/shared/ui/Panel'
import { ColorPicker } from '@/shared/ui/ColorPicker'
import { InputText } from '@/shared/ui/InputText'
import { useStackSolidPaintStyle } from '../hooks/useStackSolidPaintStyle'
import { useGraph } from '@graph-state/react'
import { POPOUT_TYPE, popoutsStore } from '@/shared/store/popouts.store'
import { popoutNames } from '@/shared/data'
import { Button } from '@/shared/ui/Button'
import { objectToColorString } from '@fragmentsx/utils'

export type StackPanelColorEntity = { name: string; color: Color }

export interface StackPanelCreateColorOptions {
  initialColor?: Color
  onSubmit?: (color: StackPanelColorEntity) => void
}

interface StackPanelCreateColorProps extends StackPanel {
  className?: string
}

const StackSolidPaintStyle: FC<StackPanelCreateColorProps> = ({ className }) => {
  const [popout] = useGraph(popoutsStore, `${POPOUT_TYPE}:${popoutNames.stackSolidPaintStyle}`, { deep: true })
  const context = popout?.context
  const nameRef = useRef<ComponentRef<'input'>>(null)
  const [name, setName] = useState('')
  const [color, setColor] = useState('#000')

  useEffect(() => {
    if (context) {
      setName(context.name)
      setColor(context.defaultValue)
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
            popoutsStore?.goPrev()
          }}
        >
          Save
        </Button>
      </div>
    </div>
  )
}

export default StackSolidPaintStyle
