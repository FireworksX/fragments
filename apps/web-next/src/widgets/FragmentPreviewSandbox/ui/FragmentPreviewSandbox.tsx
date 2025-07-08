import { FC, useEffect } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { definition } from '@fragmentsx/definition'
import { Spinner } from '@/shared/ui/Spinner'
import { PreviewSandboxResize } from '../components/PreviewSandboxResize'
import { PreviewSandboxProps } from '../widgets/PreviewSandboxProps'
import { useFragmentPreviewSandbox } from '@/widgets/FragmentPreviewSandbox/hooks/useFragmentPreviewSandbox'
import { Instance } from '@fragmentsx/render-react'
import { StackCollector } from '@/widgets/StackCollector'
import StackFragmentProps from '@/features/popouts/StackFragmentProps/ui/StackFragmentProps'
import { popoutNames } from '@/shared/data'
import { Button } from '@/shared/ui/Button'
import { popoutsStore } from '@/shared/store/popouts.store'
import { StackPanelColorPicker } from '@/features/popouts/StackPanelColorPicker'
import StackGoals from '@/features/popouts/StackGoals/ui/StackGoals'
import StackCreateGoal from '@/features/popouts/StackCreateGoal/ui/StackCreateGoal'

interface FragmentPreviewSandboxProps {
  initialProps?: unknown
  fragmentId: unknown
  className?: string
  onChangeProps?: () => void
}

export const FragmentPreviewSandbox: FC<FragmentPreviewSandboxProps> = ({
  className,
  fragmentId,
  initialProps,
  onChangeProps
}) => {
  const { props, setProps } = useFragmentPreviewSandbox(initialProps, onChangeProps)
  // const { loading } = useFragmentManager(fragmentId)

  return (
    <div className={cn(styles.root, className)}>
      {false ? (
        <Spinner color='var(--text-color-accent)' />
      ) : (
        <div className={styles.content}>
          <div className={styles.popout}>
            <StackCollector>
              <StackFragmentProps name={popoutNames.stackFragmentProps} title='Configure Props' />
              <StackPanelColorPicker name={popoutNames.colorPicker} title='Color' />
              <StackGoals name={popoutNames.stackGoals} title='Goals' />
              <StackCreateGoal name={popoutNames.stackCreateGoal} title='Create Goal' />
            </StackCollector>
          </div>

          <div className={styles.actions}>
            <Button
              mode='outline'
              onClick={() => {
                popoutsStore.open(popoutNames.stackFragmentProps, {
                  initial: true,
                  context: {
                    fragmentId,
                    props,
                    onChange: setProps
                  }
                })
              }}
            >
              Edit props
            </Button>

            {/*<PreviewSandboxProps fragmentId={fragmentId} props={props} onChange={setProps} />*/}
          </div>
          <PreviewSandboxResize>
            <Instance fragmentId={fragmentId} props={props} globalManager={window?.globalManager} />
          </PreviewSandboxResize>
        </div>
      )}
    </div>
  )
}
