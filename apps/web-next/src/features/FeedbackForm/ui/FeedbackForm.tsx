'use client'
import { FC, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Markdown from '@/shared/icons/markdown.svg'
import { Textarea } from '@/shared/ui/Textarea'
import { Touchable } from '@/shared/ui/Touchable'
import { CommonLogo } from '@/shared/ui/CommonLogo'
import { Button } from '@/shared/ui/Button'
import { Panel } from '@/shared/ui/Panel'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { Select } from '@/shared/ui/Select'
import { Slider } from '@/shared/ui/Slider'
import { useSendFeedbackMutation } from '@/features/FeedbackForm/queries/SendFeedback.generated'
import { FeelLevelGet } from '@/__generated__/types'
import emojiOne from '../emoji/emoji-cry.png'
import emojiTwo from '../emoji/emoji-sad.png'
import emojiThree from '../emoji/emoji-smile.png'
import emojiFour from '../emoji/emoji-love.png'
import CheckIcon from '@/shared/icons/next/check.svg'
import { promiseWaiter } from '@fragmentsx/utils'

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
  0: FeelLevelGet.One,
  1: FeelLevelGet.Two,
  2: FeelLevelGet.Three,
  3: FeelLevelGet.Four,
  4: FeelLevelGet.Five
}

export const FeedbackForm: FC<FeedbackFormProps> = ({ className }) => {
  const [type, setType] = useState('feedback')
  const [bugPriority, setBugPriority] = useState('medium')
  const [emotion, setEmotion] = useState(1)
  const [message, setMessage] = useState('')
  const [isNotify, setIsNotify] = useState(false)

  const [send, { loading }] = useSendFeedbackMutation()

  const handleSubmit = async e => {
    e?.preventDefault()
    e?.stopPropagation()
    if (isNotify) {
      setIsNotify(false)
      return
    }

    await send({
      variables: {
        page: window.location.href,
        content: `
        Тип: ${type}
        ${type === 'bug' ? `Приоритет: ${bugPriority}` : ''}
        Сообщение: ${message}
        `,
        feel: emotionToFeel[emotion ?? 0]
      }
    })

    setIsNotify(true)
    await promiseWaiter(1500)
    setIsNotify(false)

    setMessage('')
    setEmotion(1)
    setBugPriority('medium')
    setType('feedback')
  }

  return (
    <form className={cn(styles.root, className)} data-testid='FeedbackForm' onSubmit={handleSubmit}>
      <Panel
        title='Feedback'
        footer={
          <Button
            className={styles.footer}
            type='submit'
            stretched
            mode={isNotify ? 'success' : 'primary'}
            loading={loading}
          >
            {isNotify ? 'Success' : 'Submit'}
          </Button>
        }
      >
        <div
          className={cn(styles.feedbackDone, {
            [styles.feedbackActive]: isNotify
          })}
        >
          <CheckIcon width={24} height={24} />
        </div>
        <ControlRow title='Type'>
          <ControlRowWide>
            <Select value={type} onChange={setType}>
              <option value='feedback'>Feedback</option>
              <option value='bug'>Bug</option>
              <option value='proposal'>Proposal</option>
            </Select>
          </ControlRowWide>
        </ControlRow>
        {type === 'bug' && (
          <ControlRow title='Bug Priority'>
            <ControlRowWide>
              <Select value={bugPriority} onChange={setBugPriority}>
                <option value='low'>Low</option>
                <option value='medium'>Medium</option>
                <option value='high'>High</option>
                <option value='critical'>Critical</option>
              </Select>
            </ControlRowWide>
          </ControlRow>
        )}
        {type === 'feedback' && (
          <ControlRow title='Emotion'>
            <CommonLogo size={20} src={emojiIcons?.[emotion]?.src} />
            <Slider value={emotion} min={0} max={3} onChange={setEmotion} />
          </ControlRow>
        )}
        <ControlRow isHideTitle>
          <ControlRowWide>
            <Textarea placeholder='Message' className={styles.textarea} value={message} onChangeValue={setMessage} />
          </ControlRowWide>
        </ControlRow>
      </Panel>
    </form>
  )
}
