import { ElementRef, FC, useContext, useEffect, useRef, useState } from 'react'
import { Color } from 'react-color'
import cn from 'classnames'
import styles from './styles.module.css'
import InputText from '@/app/components/InputText/InputText'
import Button from '@/app/components/Button'
import { useGraph } from '@graph-state/react'
import { POPOUT_TYPE, popoutsStore } from '@/app/store/popouts.store'
import { StackPanel } from '@/builder/StackCollector/hooks/useStackCollector'
import Panel from '@/builder/components/Panel/Panel'
import ColorPicker from '@/builder/components/ColorPicker/ColorPicker'
import { SpringValue } from '@react-spring/web'
import { useDisplayColor } from '@/builder/hooks/useDisplayColor'
import { pick } from '@fragments/utils'
import { getStaticColor } from '@/builder/utils/getStaticColor'

export type StackPanelColorEntity = { name: string; color: Color }

export interface StackPanelCreateColorOptions {
  initialColor?: Color
  onSubmit?: (color: StackPanelColorEntity) => void
}

interface StackPanelCreateColorProps extends StackPanel {
  className?: string
}

const getDefaultColor = () => ({
  r: new SpringValue(86),
  g: new SpringValue(177),
  b: new SpringValue(196),
  a: new SpringValue(1)
})

const StackPanelCreateColor: FC<StackPanelCreateColorProps> = ({ className }) => {
  const [popout] = useGraph(popoutsStore, `${POPOUT_TYPE}:createColor`)
  const context = popout?.context
  const nameRef = useRef<ElementRef<'input'>>()
  const { getColor, getColorStatic } = useDisplayColor()
  const color = useRef<Color>(getColorStatic(context?.initialColor) || getDefaultColor())
  const [name, setName] = useState('')

  useEffect(() => {
    if (context) {
      setTimeout(() => nameRef.current?.focus(), 250)
    }
  }, [context])

  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.body}>
        <InputText inputRef={nameRef} placeholder='Color name' value={name} onChange={setName} />
        <Panel>
          <ColorPicker
            color={getColor(color.current)}
            onChange={({ rgb }) => {
              Object.entries(rgb).forEach(([k, v]) => {
                color.current[k].start(v)
              })
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
                color: getStaticColor(pick(color.current, 'r', 'g', 'b', 'a'))
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
