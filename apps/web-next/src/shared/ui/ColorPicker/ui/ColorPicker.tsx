import { FC } from 'react'
import { AlphaPicker, CustomPicker } from 'react-color'
import { Saturation, Hue, EditableInput } from 'react-color/lib/components/common'
import { animated } from '@react-spring/web'
import cn from 'classnames'
import styles from './styles.module.css'
import { InputText } from '@/shared/ui/InputText'
import { displayColor } from '@/shared/utils/displayColor'

interface ColorPickerProps {
  className?: string
  onChange: (color: string) => void
}

const alphaStyles = {
  gradient: {
    borderRadius: '8px'
  }
}

const inputStyles = {
  input: {
    width: '100%',
    border: 'none',
    transition: 'var(--animation-transition-default)',
    background: ' var(--background-secondary)',
    borderRadius: 'var(--radius-second)',
    outline: 'none',
    height: 30,
    fontSize: 12,
    fontWeight: 500,
    paddingLeft: 7
  }
}

const ColorPicker: FC<ColorPickerProps> = ({ className, rgb, hex, hsl, hsv, onChange }) => {
  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.saturationWrapper}>
        <Saturation hsl={hsl} hsv={hsv} pointer={() => <div className={styles.pointer} />} onChange={onChange} />
      </div>
      <div className={styles.controls}>
        <div className={styles.colorControls}>
          <AlphaPicker
            color={hsl}
            width='100%'
            height='8px'
            style={alphaStyles}
            pointer={() => <div className={styles.pointer} />}
            onChange={nextColor => {
              onChange(nextColor.hsl)
            }}
          />
          <div className={styles.hueWrapper}>
            <Hue
              hsl={hsl}
              width='100%'
              height='8px'
              pointer={() => <div className={styles.pointer} />}
              onChange={onChange}
            />
          </div>
        </div>
        <EditableInput
          style={inputStyles}
          value={displayColor(rgb?.a < 1 ? rgb : hex)}
          onChange={value => onChange(value)}
        />
      </div>
    </div>
  )
}

export default animated(CustomPicker(ColorPicker))
