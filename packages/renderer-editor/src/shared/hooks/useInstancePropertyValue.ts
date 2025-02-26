import { GraphState, LinkKey } from "@graph-state/core";
import { useLayerValue } from "@/shared/hooks/useLayerValue.ts";
import { useInstanceDefinition } from "@/shared/hooks/useInstanceDefinition.ts";
import { useLayer } from "@/shared/hooks/useLayer.ts";

export const useInstancePropertyValue = (
  manager: GraphState,
  instanceKey: LinkKey,
  propertyKey: LinkKey
) => {
  if (!manager) {
    return [null, () => null, {}];
  }

  /*
  Достаём manager для фрагмента, к которому привязан Instance, чтобы
  из этого менеджера достать данные о propertyKey, его тип и тд.

  Когда мы это узнаем, сможем получить zod схему для этого проперти и
  из этой схемы достать defaultValue
   */
  const { manager: instanceManager } = useInstanceDefinition(
    manager,
    instanceKey
  );
  const [props, updateProps] = useLayerValue(instanceKey, "props", manager);
  const { layer: propertyLayer } = useLayer(propertyKey, instanceManager);
  const { _id: propertyId } = manager?.entityOfKey(propertyKey) ?? {
    _id: null,
  };
  const currentValue = props?.[propertyId] ?? null;
  const required = propertyLayer?.required ?? false;
  const defaultValue = propertyLayer?.defaultValue ?? null;

  return [
    required ? currentValue : currentValue ?? defaultValue,
    (value) => {
      updateProps({ [propertyId]: value });
    },
    {
      propertyLayer,
    },
  ];
};
