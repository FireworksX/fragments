import { ElementRef, FC, useContext, useEffect, useRef, useState } from 'react'
import { Color } from 'react-color'
import cn from 'classnames'
import styles from './styles.module.css'
import { Panel } from '@/shared/ui/Panel'
import { ColorPicker } from '@/shared/ui/ColorPicker'
import { InputText } from '@/shared/ui/InputText'
import { useStackSolidPaintStyle } from '../hooks/useStackSolidPaintStyle'

export type StackPanelColorEntity = { name: string; color: Color }

export interface StackPanelCreateColorOptions {
  initialColor?: Color
  onSubmit?: (color: StackPanelColorEntity) => void
}

interface StackPanelCreateColorProps extends StackPanel {
  className?: string
}

const StackSolidPaintStyle: FC<StackPanelCreateColorProps> = ({ className }) => {
  const { nameRef, name, setName, color$, updateColor } = useStackSolidPaintStyle()

  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.body}>
        <InputText inputRef={nameRef} placeholder='Color name' value={name} onChangeValue={setName} />
        <Panel>
          <ColorPicker
            color={color$}
            onChange={({ rgb }) => {
              updateColor(rgb)
            }}
          />
        </Panel>
      </div>
    </div>
  )
}

export default StackSolidPaintStyle
