import { FC, useContext, useMemo, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { POPOUT_TYPE, popoutsStore } from '@/shared/store/popouts.store'
import { useGraph } from '@graph-state/react'
import { TabsSelector, TabsSelectorItem } from '@/shared/ui/TabsSelector'
import { capitalize } from '@/shared/utils/capitalize'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputText } from '@/shared/ui/InputText'
import { popoutNames } from '@/shared/data'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { ImagePicker } from '@/features/fragmentBuilder/ImagePicker'

interface StackImagePickerProps {
  className?: string
}

export const StackImagePicker: FC<StackImagePickerProps> = ({ className }) => {
  const [popout] = useGraph(popoutsStore, `${POPOUT_TYPE}:${popoutNames.imagePicker}`)
  const context = popout?.context ?? {}
  const url = context?.url
  const scaleMode = context?.scaleMode

  const proxyOnChangeUrl = (url: string) => {
    popoutsStore.updateCurrentContext({ url })
    context?.onChangeUrl?.(url)
  }

  const proxyOnChangeScaleMode = scaleMode => {
    popoutsStore.updateCurrentContext({ scaleMode })
    context?.onChangeScaleMode?.(url)
  }

  return (
    <div className={cn(styles.root, className)}>
      <ImagePicker
        urlInvoker={{ value: url, onChange: proxyOnChangeUrl }}
        scaleModeInvoker={{ value: scaleMode, onChange: proxyOnChangeScaleMode }}
      />
    </div>
  )
}
