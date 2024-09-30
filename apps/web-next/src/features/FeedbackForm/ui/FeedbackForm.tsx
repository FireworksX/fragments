'use client'
import { FC, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Markdown from '@/shared/icons/markdown.svg'
import { Textarea } from '@/shared/ui/Textarea'
import { Touchable } from '@/shared/ui/Touchable'
import { CommonLogo } from '@/shared/ui/CommonLogo'
import { Button } from '@/shared/ui/Button'

interface FeedbackFormProps {
  className?: string
}

const emojiList = ['love', 'smile', 'sad', 'cry']

export const FeedbackForm: FC<FeedbackFormProps> = ({ className }) => {
  const [emoji, setEmoji] = useState()

  return (
    <div className={cn(styles.root, className)} data-testid='FeedbackForm'>
      <div className={styles.body}>
        <Textarea placeholder='Your feedback' className={styles.textarea} />
        <div className={styles.info}>
          <Markdown width={20} height={20} />
          supported
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.emojiList}>
          {emojiList.map(emojiItem => (
            <Touchable
              key={emojiItem}
              className={cn(styles.emoji, { [styles.active]: emoji === emojiItem })}
              onClick={() => setEmoji(prev => (prev === emojiItem ? undefined : emojiItem))}
            >
              <CommonLogo size={18} src={`/images/emoji/emoji-${emojiItem}.png`} />
            </Touchable>
          ))}
        </div>
        <Button>Send</Button>
      </div>
    </div>
  )
}
