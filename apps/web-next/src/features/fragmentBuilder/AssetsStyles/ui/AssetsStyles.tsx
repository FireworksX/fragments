import React, { FC, ReactNode } from 'react'
import { Dropdown } from '@/shared/ui/Dropdown'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import { DropdownOption } from '@/shared/ui/DropdownOption'
import { Touchable } from '@/shared/ui/Touchable'
import Plus from '@/shared/icons/plus.svg'
import styles from '@/widgets/fragmentBuilder/BuilderAssets/ui/styles.module.css'
import { Panel } from '@/shared/ui/Panel'
import { useBuilderAssetsColors } from '@/shared/hooks/fragmentBuilder/useBuilderAssetsColors'
import { Container } from '@/shared/ui/Container'

interface AssetsStylesProps {
  assetsColorsNode: ReactNode
}

export const AssetsStyles: FC<AssetsStylesProps> = ({ assetsColorsNode }) => {
  const { createColor } = useBuilderAssetsColors()

  return (
    <Container>
      <Panel
        title='Styles'
        withBorderBottom
        withPaddingBottom
        aside={
          <Dropdown
            trigger='click'
            options={
              <>
                <DropdownGroup>
                  {/*<DropdownOption>Text</DropdownOption>*/}
                  <DropdownOption onClick={createColor}>Color</DropdownOption>
                  {/*<DropdownOption onClick={createCssOverride}>CSS</DropdownOption>*/}
                </DropdownGroup>
              </>
            }
          >
            <Touchable action>
              <Plus width={14} height={14} />
            </Touchable>
          </Dropdown>
        }
      >
        {assetsColorsNode}
        {/*{cssVariables.length > 0 && (*/}
        {/*  <Collapse title='CSS Overrides'>*/}
        {/*    {cssVariables.map(value => (*/}
        {/*      <CssCell*/}
        {/*        key={value?.name}*/}
        {/*        onClick={() => editCssOverride(documentManager.keyOfEntity(value), { initial: true, position: 'left' })}*/}
        {/*        onDelete={() => removeColor(documentManager.keyOfEntity(value))}*/}
        {/*      >*/}
        {/*        {value?.name}*/}
        {/*      </CssCell>*/}
        {/*    ))}*/}
        {/*  </Collapse>*/}
        {/*)}*/}
      </Panel>
    </Container>
  )
}
