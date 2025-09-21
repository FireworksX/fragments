import { FC, useContext, useMemo, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { TabsSelector, TabsSelectorItem } from '@/shared/ui/TabsSelector'
import { capitalize } from '@/shared/utils/capitalize'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputText } from '@/shared/ui/InputText'
import { popoutNames } from '@/shared/data'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { ImagePicker } from '@/features/fragmentBuilder/ImagePicker'
import { useStack } from '@/shared/hooks/useStack'

export interface StackImagePickerContext {
  value?: any
  onChange?: (value: any) => void
  url?: string
  scaleMode?: any
  onChangeUrl?: (url: string) => void
  onChangeScaleMode?: (scaleMode: any) => void
}

interface StackImagePickerProps {
  className?: string
}

export const StackImagePicker: FC<StackImagePickerProps> = ({ className }) => {
  const stack = useStack()
  const context = stack.readContext(popoutNames.imagePicker) ?? {}
  const url = context?.url
  const scaleMode = context?.scaleMode

  const proxyOnChangeUrl = (url: string) => {
    context?.onChangeUrl?.(url)
  }

  const proxyOnChangeScaleMode = scaleMode => {
    context?.onChangeScaleMode?.(scaleMode)
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
