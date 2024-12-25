import { FC, useContext } from 'react'
import { useBuilderText } from '../hooks/useBuilderText'
import { useGraph } from '@graph-state/react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useDisplayColor } from '@/shared/hooks/fragmentBuilder/useDisplayColor'
import { Panel } from '@/shared/ui/Panel'
import { Button } from '@/shared/ui/Button'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { Select } from '@/shared/ui/Select'
import { InputSelect } from '@/shared/ui/InputSelect'
import { InputNumber } from '@/shared/ui/InputNumber'
import { Stepper } from '@/shared/ui/Stepper'
import { TabsSelector } from '@/shared/ui/TabsSelector'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { generateJSON } from '@tiptap/react'
import { InputText } from '@/shared/ui/InputText'
import { useBuilderImage } from '@/widgets/fragmentBuilder/BuilderImage/hooks/useBuilderImage'

interface BuilderImageProps {
  className?: string
}

const BuilderImage: FC<BuilderImageProps> = ({ className }) => {
  const { src, alt } = useBuilderImage()

  return (
    <Panel className={className} title='Image'>
      <ControlRow title='Image'>
        <ControlRowWide>
          <InputSelect />
        </ControlRowWide>
      </ControlRow>

      <ControlRow title='Alt Text'>
        <ControlRowWide>
          <InputText placeholder='Add alt text' value={alt.value} onChange={alt.onChange} />
        </ControlRowWide>
      </ControlRow>

      {/*<ControlRow title='Alt'>*/}
      {/*  <ControlRowWide>*/}
      {/*    <Select value={weight.value} onChange={weight.onChange}>*/}
      {/*      {weight.items.map(({ label, value }) => (*/}
      {/*        <option key={label} value={value}>*/}
      {/*          {label}*/}
      {/*        </option>*/}
      {/*      ))}*/}
      {/*    </Select>*/}
      {/*  </ControlRowWide>*/}
      {/*</ControlRow>*/}
    </Panel>
  )
}

export default BuilderImage
