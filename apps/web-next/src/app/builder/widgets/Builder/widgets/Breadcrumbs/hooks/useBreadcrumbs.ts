export const useBreadcrumbs = () => {
  const statex = {} //useStore($statex)
  const { openLayerField } = {} //useStore($layers)
  const componentValue = null //useStatex(statex, openLayerField)

  return {
    list: [
      {
        label: 'Template',
        onClick: () => {
          // $layers.setKey('openLayerField', undefined)
        }
      },
      { label: componentValue?.name, isComponent: true, onClick: () => undefined }
    ]
  }
}
