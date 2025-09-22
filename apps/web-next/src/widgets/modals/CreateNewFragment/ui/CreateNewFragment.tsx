import { FC, useContext, useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useGraph, useGraphFields } from '@graph-state/react'
import { Modal } from '@/shared/ui/Modal'
import { ModalContainer } from '@/shared/ui/ModalContainer'
import { Button } from '@/shared/ui/Button'
import { InputText } from '@/shared/ui/InputText'
import { InputNumber } from '@/shared/ui/InputNumber'
import FragmentIcon from '@/shared/icons/next/component.svg'
import ImageIcon from '@/shared/icons/next/image-2.svg'
import { modalNames } from '@/shared/data'
import { useModal } from '@/shared/hooks/useModal'
import { InfoSection } from '@/components/InfoSection'
import { InfoSectionFooter } from '@/components/InfoSection/components/InfoSectionFooter'
import { Touchable } from '@/shared/ui/Touchable'
import { times } from '@fragmentsx/utils'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { Panel } from '@/shared/ui/Panel'
import { useFragmentTemplatesQuery } from '@/widgets/modals/CreateNewFragment/queries/FragmentTamplates.generated'
import { Spinner } from '@/shared/ui/Spinner'
import { SpinnerBlock } from '@/shared/ui/SpinnerBlock'

interface CreateNewFragmentProps {
  className?: string
}

export interface CreateNewFragmentContext {
  onCreate?: (name: string, templateId?: number | null) => void
}

const BLANK_TEMPLATE = {
  id: null,
  name: 'Blank'
}

export const CreateNewFragment: FC<CreateNewFragmentProps> = ({ className }) => {
  const { readContext, close } = useModal()
  const [activeId, setActiveId] = useState(BLANK_TEMPLATE.id)
  const [name, setName] = useState('')
  const context = readContext(modalNames.createFragment)

  const { data, loading } = useFragmentTemplatesQuery({
    skip: !context
  })
  const templates = [BLANK_TEMPLATE, ...(data?.defaultTemplates ?? [])]

  useEffect(() => {
    if (!context) {
      setName('')
      setActiveId(BLANK_TEMPLATE.id)
    }
  }, [context])

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
              context?.onCreate?.(name, activeId)
              close()
            }}
          >
            Create
          </Button>
        </>
      }
    >
      <div className={styles.container}>
        <Panel>
          <ControlRow title='Name'>
            <ControlRowWide>
              <InputText placeholder='Text name of fragment' value={name} onChangeValue={setName} />
            </ControlRowWide>
          </ControlRow>
        </Panel>

        <Panel>
          {loading ? (
            <SpinnerBlock size={16} />
          ) : (
            <>
              <div className={styles.templatesTitle}>Templates</div>
              <div className={styles.body}>
                {templates.map(template => (
                  <Touchable onClick={() => setActiveId(template.id)}>
                    <InfoSection
                      className={cn(styles.template, {
                        [styles.templateActive]: activeId === template.id
                      })}
                      footer={<InfoSectionFooter icon={<FragmentIcon />}>{template.name}</InfoSectionFooter>}
                    >
                      <div className={styles.templateImage}>
                        <ImageIcon width={24} height={24} />
                      </div>
                    </InfoSection>
                  </Touchable>
                ))}
              </div>
            </>
          )}
        </Panel>
      </div>
    </ModalContainer>
  )
}
