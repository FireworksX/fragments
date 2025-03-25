import { use, useEffect } from "react";
import { GraphState, LinkKey } from "@graph-state/core";
import { useLayerValue } from "@/shared/hooks/useLayerValue.ts";
import { useLayer } from "@/shared/hooks/useLayer.ts";
import { InstanceContext } from "@/components/Instance";
import { useFragmentProperties } from "@/shared/hooks/useFragmentProperties.ts";
import { useLayerVariableValue } from "@/shared/hooks/useLayerVariableValue.ts";

export const useInstancePropertyValue = (
  manager: GraphState,
  instanceKey: LinkKey,
  propertyKey: LinkKey
) => {
  if (!manager) {
    return [null, () => null, {}];
  }

  /*
  ХУК ДЛЯ ВНЕШНЕГО ИСПОЛЬЗОВАНИЯ

  Достаём manager для фрагмента, к которому привязан Instance, чтобы
  из этого менеджера достать данные о propertyKey, его тип и тд.

  Когда мы это узнаем, сможем получить zod схему для этого проперти и
  из этой схемы достать defaultValue
   */
  // const { manager: instanceManager } = useInstanceDefinition(
  //   manager,
  //   instanceKey
  // );

  const instanceFragment = manager.resolve(instanceKey)?.fragment;
  const { manager: innerManager } = useFragmentProperties(instanceFragment);

  const [props, setProps, propsInfo] = useLayerVariableValue(
    instanceKey,
    "props",
    manager
  );
  const { layer: propertyLayer } = useLayer(propertyKey, innerManager);
  const { _id: propertyId } = manager?.entityOfKey(propertyKey) ?? {
    _id: null,
  };

  const currentValue = props?.[propertyId] ?? null;
  const required = propertyLayer?.required ?? false;
  const defaultValue = propertyLayer?.defaultValue ?? null;
  const resultValue = required ? currentValue : currentValue ?? defaultValue;

  return [
    resultValue,
    (value) => setProps({ [propertyId]: value }),
    { propertyLayer },
  ];

  //
  // const resultInnerManager =
  //   instanceInnerManager ?? instanceContext.innerManager;
  //
  // const [instanceProps, updateProps] = useLayerValue(
  //   instanceKey,
  //   "props",
  //   manager
  // );
  // const resultProps = { ...instanceContext.props, ...instanceProps };
  // const { layer: propertyLayer } = useLayer(propertyKey, resultInnerManager);
  //
  // const { _id: propertyId } = resultInnerManager?.entityOfKey(propertyKey) ?? {
  //   _id: null,
  // };
  // const currentValue = resultProps?.[propertyId] ?? null;
  // const required = propertyLayer?.required ?? false;
  // const defaultValue = propertyLayer?.defaultValue ?? null;
  // const resultValue = required ? currentValue : currentValue ?? defaultValue;
  //
  // return [
  //   resultValue,
  //   (value) => {
  //     updateProps({ [propertyId]: value });
  //   },
  //   {
  //     propertyLayer,
  //   },
  // ];
};
