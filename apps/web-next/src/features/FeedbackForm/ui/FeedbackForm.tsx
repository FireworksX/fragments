'use client'
import { FC, useState } from 'react'
import cn from 'classnames'
import LinkIcon from '@/shared/icons/next/external-link.svg'
import styles from './styles.module.css'
import { Textarea } from '@/shared/ui/Textarea'
import { CommonLogo } from '@/shared/ui/CommonLogo'
import { Button } from '@/shared/ui/Button'
import { Panel } from '@/shared/ui/Panel'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { Select } from '@/shared/ui/Select'
import { Slider } from '@/shared/ui/Slider'
import { useSendFeedbackMutation } from '@/features/FeedbackForm/queries/SendFeedback.generated'
import { BugPriority, FeelLevel, IssueType } from '@/__generated__/types'
import emojiOne from '../emoji/emoji-cry.png'
import emojiTwo from '../emoji/emoji-sad.png'
import emojiThree from '../emoji/emoji-smile.png'
import emojiFour from '../emoji/emoji-love.png'
import CheckIcon from '@/shared/icons/next/check.svg'
import { promiseWaiter } from '@fragmentsx/utils'
import { capitalize } from '@/shared/utils/capitalize'
import { InputText } from '@/shared/ui/InputText'
import { ImagePicker } from '@/features/fragmentBuilder/ImagePicker'
import { ImageSelector } from '@/shared/ui/ImageSelector'
import ImageSelectorShort from '@/shared/ui/ImageSelectorShort/ui/ImageSelectorShort'
import { InputSelect } from '@/shared/ui/InputSelect'
import { ImageFileViewer } from '@/shared/ui/ImageFileViewer'

interface FeedbackFormProps {
  className?: string
}

const emojiIcons = {
  0: emojiOne,
  1: emojiTwo,
  2: emojiThree,
  3: emojiFour
}

const emotionToFeel = {
  0: FeelLevel.One,
  1: FeelLevel.Two,
  2: FeelLevel.Three,
  3: FeelLevel.Four,
  4: FeelLevel.Five
}

export const FeedbackForm: FC<FeedbackFormProps> = ({ className }) => {
  const [type, setType] = useState(IssueType.Feedback)
  const [bugPriority, setBugPriority] = useState(BugPriority.Medium)
  const [emotion, setEmotion] = useState(1)
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [isNotify, setIsNotify] = useState(false)
  const [attachments, setAttachments] = useState<File[]>([])

  const [send, { loading, data: feedbackData }] = useSendFeedbackMutation()

  const resetForm = () => {
    setMessage('')
    setTitle('')
    setEmotion(1)
    setBugPriority(BugPriority.Medium)
    setType(IssueType.Feedback)
    setAttachments([])
  }

  const handleSubmit = async e => {
    e?.preventDefault()
    e?.stopPropagation()
    if (isNotify) {
      setIsNotify(false)
      resetForm()
      return
    }

    let variableBag: any = {}
    const page = window.location.href

    if (type === IssueType.Issue) {
      variableBag.bug = {
        page,
        title,
        priority: bugPriority,
        content: message,
        attachments
      }
    } else if (type === IssueType.Feedback) {
      variableBag.feedback = {
        page,
        content: message,
        attachments,
        feel: emotionToFeel[emotion]
      }
    } else if (type === IssueType.Proposal) {
      variableBag.proposal = {
        page,
        title,
        content: message,
        attachments
      }
    }

    await send({
      variables: {
        type,
        ...variableBag
      }
    })

    resetForm()
    setIsNotify(true)
    if (type === IssueType.Feedback) {
      await promiseWaiter(3000)
      setIsNotify(false)
    }
  }

  return (
    <form className={cn(styles.root, className)} data-testid='FeedbackForm' onSubmit={handleSubmit}>
      <Panel
        title='Feedback'
        footer={
          <Button
            className={styles.footer}
            type='submit'
            mode={isNotify ? 'outline' : 'primary'}
            stretched
            loading={loading}
          >
            {isNotify ? 'Create New' : 'Submit'}
          </Button>
        }
      >
        <ControlRow title='Type'>
          <ControlRowWide>
            <Select disabled={loading} value={type} onChange={setType}>
              {Object.values(IssueType).map(type => (
                <option value={type}>{capitalize(type.toLowerCase())}</option>
              ))}
            </Select>
          </ControlRowWide>
        </ControlRow>
        {type === IssueType.Issue && (
          <ControlRow title='Bug Priority'>
            <ControlRowWide>
              <Select disabled={loading} value={bugPriority} onChange={setBugPriority}>
                {Object.values(BugPriority).map(type => (
                  <option value={type}>{capitalize(type.toLowerCase())}</option>
                ))}
              </Select>
            </ControlRowWide>
          </ControlRow>
        )}
        {type === IssueType.Feedback && (
          <ControlRow title='Emotion'>
            <CommonLogo size={20} src={emojiIcons?.[emotion]?.src} />
            <Slider disabled={loading} value={emotion} min={0} max={3} onChange={setEmotion} />
          </ControlRow>
        )}
        <ControlRow title='Attachments'>
          <ControlRowWide>
            {attachments.map((attachment, index) => (
              <InputSelect
                icon={<ImageFileViewer file={attachment} />}
                onReset={() =>
                  setAttachments(prev => {
                    return prev.toSpliced(index, 1)
                  })
                }
              >
                {attachment.name}
              </InputSelect>
            ))}

            <ImageSelectorShort
              // value={urlInvoker?.value}
              isUploading={loading}
              onChange={file => setAttachments(prev => [...prev, file])}
              // onReset={() => urlInvoker?.onChange('')}
            />
          </ControlRowWide>
        </ControlRow>

        {type !== IssueType.Feedback && (
          <ControlRow isHideTitle>
            <ControlRowWide>
              <InputText placeholder='Title' value={title} onChangeValue={setTitle} />
            </ControlRowWide>
          </ControlRow>
        )}

        <ControlRow isHideTitle>
          <ControlRowWide>
            <Textarea
              disabled={loading}
              placeholder='Message'
              className={styles.textarea}
              value={message}
              onChangeValue={setMessage}
            />
          </ControlRowWide>
        </ControlRow>

        <div
          className={cn(styles.feedbackDone, {
            [styles.feedbackActive]: isNotify
          })}
        >
          <CheckIcon width={28} height={28} />
          {feedbackData?.createIssue?.ticketLink && (
            <a href={feedbackData?.createIssue?.ticketLink} target='_blank'>
              <Button TagName='div' mode='tertiary' size='large' icon={<LinkIcon />}>
                Open your ticket
              </Button>
            </a>
          )}
        </div>
      </Panel>
    </form>
  )
}
