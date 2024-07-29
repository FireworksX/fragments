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
import { LayerInvokerValue } from '@/builder/hooks/useLayerInvoker'

export type ImagePickerValue = ImagePaint

interface ImagePickerProps {
  className?: string
  urlInvoker: LayerInvokerValue<string>
  scaleModeInvoker: LayerInvokerValue<keyof typeof builderImagePaintScaleModes>
}

const ImagePicker: FC<ImagePickerProps> = ({ className, urlInvoker, scaleModeInvoker, onReset }) => {
  const { data, progress, fetching, onUpload } = useUploadFile('projectAssets')

  useEffect(() => {
    if (data?.url && data?.url !== urlInvoker.value) {
      urlInvoker.onChange(data.url)
    }
  }, [data])

  console.log(urlInvoker.value)

  return (
    <div className={cn(styles.root, className)}>
      <ImageSelector
        value={urlInvoker.value}
        progress={progress}
        isUploading={fetching}
        onChange={onUpload}
        onReset={onReset}
      />
      <Panel>
        {/*<ControlRow title='Sizing'>*/}
        {/*  <ControlRowWide>*/}
        {/*    <Select*/}
        {/*      value={value?.scaleMode}*/}
        {/*      onChange={(scaleMode: ImageFill['size']) =>*/}
        {/*        onChange({*/}
        {/*          ...value,*/}
        {/*          scaleMode*/}
        {/*        })*/}
        {/*      }*/}
        {/*    >*/}
        {/*      {Object.keys(builderImagePaintScaleModes).map(mode => (*/}
        {/*        <option key={mode} value={mode}>*/}
        {/*          {mode}*/}
        {/*        </option>*/}
        {/*      ))}*/}
        {/*    </Select>*/}
        {/*  </ControlRowWide>*/}
        {/*</ControlRow>*/}
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
