import { FC, useContext, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useGraph, useGraphFields } from '@graph-state/react'
import { Modal } from '@/shared/ui/Modal'
import { ModalContainer } from '@/shared/ui/ModalContainer'
import { Button } from '@/shared/ui/Button'
import { InputText } from '@/shared/ui/InputText'
import { InputNumber } from '@/shared/ui/InputNumber'
import { modalStore } from '@/shared/store/modal.store'
import FragmentIcon from '@/shared/icons/next/component.svg'
import ImageIcon from '@/shared/icons/next/image-2.svg'
import { modalNames } from '@/shared/data'
import { useModal } from '@/shared/hooks/useModal'
import { InfoSection } from '@/components/InfoSection'
import { InfoSectionFooter } from '@/components/InfoSection/components/InfoSectionFooter'
import { Touchable } from '@/shared/ui/Touchable'
import { times } from '@fragmentsx/utils'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'

interface CreateNewFragmentProps {
  className?: string
}

export interface CreateNewFragmentContext {
  onCreate?: (name: string) => void
}

export const CreateNewFragment: FC<CreateNewFragmentProps> = ({ className }) => {
  const { readContext, close } = useModal()
  const [activeIndex, setActiveIndex] = useState(0)
  const [name, setName] = useState('')
  const context = readContext(modalNames.createFragment)

  return (
    <ModalContainer
      width={500}
      title='New Fragment'
      footer={
        <>
          <Button mode='secondary' stretched onClick={close}>
            Cancel
          </Button>
          <Button
            stretched
            onClick={() => {
              context?.onCreate?.(name)
              close()
            }}
          >
            Create
          </Button>
        </>
      }
    >
      <div className={styles.container}>
        <ControlRow title='Name'>
          <ControlRowWide>
            <InputText placeholder='Text name of fragment' value={name} onChangeValue={setName} />
          </ControlRowWide>
        </ControlRow>

        <div className={styles.templatesTitle}>templates</div>

        <div className={styles.body}>
          {times(40).map(i => (
            <Touchable onClick={() => setActiveIndex(i)}>
              <InfoSection
                className={cn(styles.template, {
                  [styles.templateActive]: activeIndex === i
                })}
                footer={<InfoSectionFooter icon={<FragmentIcon />}>Button</InfoSectionFooter>}
              >
                <div className={styles.templateImage}>
                  <ImageIcon width={24} height={24} />
                </div>
              </InfoSection>
            </Touchable>
          ))}
        </div>
      </div>
    </ModalContainer>
  )
}
