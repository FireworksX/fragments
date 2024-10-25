import { FC, useEffect } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useUploadFile } from '@/shared/hooks/useUploadFile'
import { ImageSelector } from '@/shared/ui/ImageSelector'
import { Select } from '@/shared/ui/Select'
import { Button } from '@/shared/ui/Button'
import { LayerInvokerValue } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { Panel } from '@/shared/ui/Panel'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { imagePaintScaleModes } from '@fragments/plugin-state'

export type ImagePickerValue = ImagePaint

interface ImagePickerProps {
  className?: string
  urlInvoker: LayerInvokerValue<string>
  scaleModeInvoker: LayerInvokerValue<keyof typeof imagePaintScaleModes>
}

const ImagePicker: FC<ImagePickerProps> = ({ className, urlInvoker, scaleModeInvoker }) => {
  const { data, progress, fetching, onUpload } = useUploadFile('projectAssets')

  useEffect(() => {
    if (data?.url && data?.url !== urlInvoker.value) {
      urlInvoker.onChange(data.url)
    }
  }, [data])

  return (
    <div className={cn(styles.root, className)}>
      <ImageSelector
        value={urlInvoker.value}
        progress={progress}
        isUploading={fetching}
        onChange={onUpload}
        onReset={() => urlInvoker.onChange('')}
      />
      <Panel>
        {scaleModeInvoker && (
          <ControlRow title='Sizing'>
            <ControlRowWide>
              <Select value={scaleModeInvoker.value} onChange={scaleModeInvoker.onChange}>
                {Object.keys(imagePaintScaleModes).map(mode => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </Select>
            </ControlRowWide>
          </ControlRow>
        )}
        {/*<BuilderControlRow title='Position'>*/}
        {/*  <BuilderControlRowWide>*/}
        {/*    <Select value='fit'>*/}
        {/*      <option value='left'>Left</option>*/}
        {/*      <option value='center'>Center</option>*/}
        {/*      <option value='right'>Right</option>*/}
        {/*    </Select>*/}
        {/*  </BuilderControlRowWide>*/}
        {/*</BuilderControlRow>*/}
      </Panel>
      <Button mode='secondary'>Assets</Button>
    </div>
  )
}

export default ImagePicker
