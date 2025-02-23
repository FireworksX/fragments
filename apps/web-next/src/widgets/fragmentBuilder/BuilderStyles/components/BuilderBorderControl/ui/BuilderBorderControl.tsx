import { FC, memo } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { popoutsStore } from '@/shared/store/popouts.store'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputSelect } from '@/shared/ui/InputSelect'
import { borderType as defBorderType, paintMode } from '@fragments/plugin-fragment'

interface BuilderBorderControlProps {
  className?: string
}

export const BuilderBorderControl: FC<BuilderBorderControlProps> = memo(({ className }) => {
  const [borderType, setBorderType, borderTypeInfo] = useLayerValue('borderType')
  const [borderColor, setBorderColor, borderColorInfo] = useLayerValue('borderColor')

  const openBorder = () => {
    popoutsStore.open('border', {
      initial: true
    })
  }

  return (
    <ControlRow
      className={className}
      title='Border'
      override={{
        isOverride: borderTypeInfo.isOverride || borderColorInfo.isOverride,
        onRestOverride: borderTypeInfo.resetOverride || borderColorInfo.resetOverride
      }}
    >
      <ControlRowWide>
        <InputSelect
          placeholder='Add...'
          hasIcon={!!borderType && borderType !== defBorderType.None}
          color={borderColor}
          onReset={() => setBorderType(defBorderType.None)}
          onClick={openBorder}
        >
          {borderType !== defBorderType.None ? borderType : ''}
        </InputSelect>
      </ControlRowWide>
    </ControlRow>
  )
})
