import { FC, useEffect } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Panel from '@/app/builder/widgets/Builder/components/Panel/Panel'
import ImageSelector from '@/app/components/ImageSelector/ImageSelector'
import ControlRow from '@/app/builder/widgets/Builder/components/ControlRow/ControlRow'
import ControlRowWide from '@/app/builder/widgets/Builder/components/ControlRow/components/ControlRowWide/ControlRowWide'
import Select from '@/app/components/Select/Select'
import Button from '@/app/components/Button'
import { useUploadFile } from '@/app/hooks/useUploadFile'
import { builderImagePaintScaleModes } from '@fragments/fragments-plugin'

export type ImagePickerValue = ImagePaint

interface ImagePickerProps {
  value: ImagePickerValue
  className?: string
  onChange: (value: ImagePickerValue) => void
}

const ImagePicker: FC<ImagePickerProps> = ({ className, value, onChange }) => {
  const { data, progress, fetching, onUpload } = useUploadFile()

  useEffect(() => {
    if (data?.result?.url && data?.result?.url !== value.src) {
      onChange({
        ...value,
        url: data.result.url
      })
    }
  }, [data])

  return (
    <div className={cn(styles.root, className)}>
      <ImageSelector value={value?.url} progress={progress} isUploading={fetching} onChange={onUpload} />
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
