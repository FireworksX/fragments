import { FC, useEffect } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import ImageSelector from '@/app/components/ImageSelector/ImageSelector'
import Select from '@/app/components/Select/Select'
import Button from '@/app/components/Button'
import { useUploadFile } from '@/app/hooks/useUploadFile'
import { builderImagePaintScaleModes } from '@fragments/fragments-plugin'
import Panel from '@/builder/components/Panel/Panel'
import ControlRow from '@/builder/components/ControlRow/ControlRow'
import ControlRowWide from '@/builder/components/ControlRow/components/ControlRowWide/ControlRowWide'

export type ImagePickerValue = ImagePaint

interface ImagePickerProps {
  value: ImagePickerValue
  className?: string
  onChange: (value: ImagePickerValue) => void
  onReset?: () => void
}

const ImagePicker: FC<ImagePickerProps> = ({ className, value, onChange, onReset }) => {
  const { data, progress, fetching, onUpload } = useUploadFile('projectAssets')

  useEffect(() => {
    if (data?.url && data?.url !== value?.src) {
      onChange({
        ...value,
        url: data.url
      })
    }
  }, [data])

  return (
    <div className={cn(styles.root, className)}>
      <ImageSelector
        value={value?.url}
        progress={progress}
        isUploading={fetching}
        onChange={onUpload}
        onReset={onReset}
      />
      <Panel>
        <ControlRow title='Sizing'>
          <ControlRowWide>
            <Select
              value={value?.scaleMode}
              onChange={(scaleMode: ImageFill['size']) =>
                onChange({
                  ...value,
                  scaleMode
                })
              }
            >
              {Object.keys(builderImagePaintScaleModes).map(mode => (
                <option key={mode} value={mode}>
                  {mode}
                </option>
              ))}
            </Select>
          </ControlRowWide>
        </ControlRow>
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
