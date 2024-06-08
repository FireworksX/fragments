'use client'
import { FC, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Textarea from '@/app/components/Textarea/Textarea'
import Markdown from '@/app/svg/markdown.svg'
import Button from '@/app/components/Button'
import CommonLogo from '@/app/components/CommonLogo/CommonLogo'
import Touchable from '@/app/components/Touchable'

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
