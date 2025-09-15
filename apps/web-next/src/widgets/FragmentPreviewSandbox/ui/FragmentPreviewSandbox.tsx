import { FC, useEffect } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { definition } from '@fragmentsx/definition'
import { Spinner } from '@/shared/ui/Spinner'
import ExternalLink from '@/shared/icons/next/external-link.svg'
import { PreviewSandboxResize } from '../components/PreviewSandboxResize'
import { PreviewSandboxProps } from '../widgets/PreviewSandboxProps'
import { useFragmentPreviewSandbox } from '@/widgets/FragmentPreviewSandbox/hooks/useFragmentPreviewSandbox'
import { Instance } from '@fragmentsx/render-react'
import { StackCollector } from '@/widgets/StackCollector'
import { popoutNames } from '@/shared/data'
import { Button } from '@/shared/ui/Button'
import { popoutsStore } from '@/shared/store/popouts.store'
import { StackPanelColorPicker } from '@/features/popouts/StackPanelColorPicker'
import { StackGoals } from '@/features/popouts/StackGoals'
import { StackCreateGoal } from '@/features/popouts/StackCreateGoal'
import { StackFragmentProps } from '@/features/popouts/StackFragmentProps'
import { StackObjectValue } from '@/features/popouts/StackObjectValue'
import { StackArrayValue } from '@/features/popouts/StackArrayValue'
import { Link } from '@/shared/ui/Link'

interface FragmentPreviewSandboxProps {
  initialProps?: unknown
  fragmentId: unknown
  className?: string
  hideOpenInEditor?: boolean
  areaProperties?: unknown
  onChangeProps?: () => void
}

export const FragmentPreviewSandbox: FC<FragmentPreviewSandboxProps> = ({
  className,
  fragmentId,
  hideOpenInEditor,
  initialProps,
  areaProperties,
  onChangeProps
}) => {
  const { props, setProps } = useFragmentPreviewSandbox(initialProps, onChangeProps, areaProperties)
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
              <StackObjectValue name={popoutNames.stackObjectValue} title='Object Value' />
              <StackArrayValue name={popoutNames.stackArrayValue} title='Array Value' />
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
                    areaProperties,
                    onChange: setProps
                  }
                })
              }}
            >
              Edit props
            </Button>

            {!hideOpenInEditor && (
              <Link type='builderFragment' fragmentId={fragmentId} target='_blank'>
                <Button TagName='div' icon={<ExternalLink />} mode='tertiary'>
                  Open in editor
                </Button>
              </Link>
            )}

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
