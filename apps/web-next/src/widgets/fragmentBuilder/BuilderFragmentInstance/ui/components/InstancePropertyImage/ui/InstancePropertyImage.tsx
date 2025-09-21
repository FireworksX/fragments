import React, { FC } from 'react'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { animated } from '@react-spring/web'
import { InputSelect } from '@/shared/ui/InputSelect'
import { popoutNames } from '@/shared/data'
import { objectToColorString } from '@fragmentsx/utils'
import { BuilderControlRowProps } from '@/shared/ui/ControlRow/ui/default/ControlRow'
import styles from '@/features/popouts/StackImageProperty/ui/styles.module.css'
import { CommonLogo } from '@/shared/ui/CommonLogo'
import { Button } from '@/shared/ui/Button'
import { useStack } from '@/shared/hooks/useStack'

interface InstancePropertyImageProps extends Pick<BuilderControlRowProps, 'variable' | 'hasConnector'> {
  name: string
  value: string
  scaleMode?: string
  className?: string
  onChange(value: string): void
  onChangeScaleMode?(value: string): void
}

export const InstancePropertyImage: FC<InstancePropertyImageProps> = ({
  className,
  name,
  value,
  scaleMode,
  onChangeScaleMode,
  onChange,
  ...controlRowProps
}) => {
  const stack = useStack()

  const openImagePicker = () => {
    stack.open(popoutNames.imagePicker, {
      url: value,
      scaleMode,
      onChangeUrl: onChange,
      onChangeScaleMode: onChangeScaleMode
    })
  }

  return (
    <ControlRow className={className} title={name} {...controlRowProps}>
      <ControlRowWide>
        {!!value ? (
          <>
            <div className={styles.preview}>
              <CommonLogo size={90} src={value} />
            </div>
            <div className={styles.previewRow}>
              <Button stretched mode='secondary' onClick={openImagePicker}>
                Edit
              </Button>
              <Button stretched mode='secondary' onClick={() => onChange()}>
                Reset
              </Button>
            </div>
          </>
        ) : (
          <Button mode='secondary' onClick={openImagePicker}>
            Upload
          </Button>
        )}
      </ControlRowWide>
    </ControlRow>
  )
}
