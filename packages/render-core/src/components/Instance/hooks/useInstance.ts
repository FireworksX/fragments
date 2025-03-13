import { useContext, useMemo } from "preact/compat";
import { FragmentContext } from "@/components/Fragment/FragmentContext.tsx";
import { useLayerStyles } from "@/shared/hooks/useLayerStyles/useLayerStyles.ts";
import { useGraph } from "@graph-state/react";
import { InstanceProps } from "@/components/Instance";
import { useFragmentProperties } from "@/shared/hooks/useFragmentProperties.ts";
import { useGlobalManager } from "@/shared/hooks/useGlobalManager";

/*
Работаем по следующему принципу. Instance может рендериться внутри родителя (Fragment)
или рендериться сразу на странице без родителя.

Если рендерится внутри родителя, то пропсы и стили хранятся в родителе, то мы:
1. Получаем manager родительского фрагмента FragmentContext
2. В manager находим инстанс по layerKey
3. Получаем пропсы и стили для этого инстанса

Если рендерится на странице (без родителя)
1. Пропсы мы получаем снаружи
 */
export const useInstance = (instanceProps: InstanceProps) => {
  const { manager: parentManager } = useContext(FragmentContext);
  const [instanceLayer] = useGraph(parentManager, instanceProps.layerKey);
  const instanceLayerProps = instanceLayer?.props ?? {};
  const styles = useLayerStyles(instanceProps.layerKey);

  const { manager: resultGlobalManager } = useGlobalManager(
    instanceProps?.globalManager
  );
  const resultProps = { ...instanceLayerProps, ...(instanceProps.props ?? {}) };
  const resultFragmentId = instanceProps?.fragmentId ?? instanceLayer?.fragment;
  const { properties: definitions, manager: innerFragmentManager } =
    useFragmentProperties(resultFragmentId);
  // // useInstanceProperties(fragmentManager, layerKey);
  //
  // return {
  //   manager: fragmentManager,
  //   styles,
  //   fragmentId: instanceLayer?.fragment,
  // };

  return {
    styles,
    definitions,
    props: resultProps,
    parentManager,
    innerManager: innerFragmentManager,
    fragmentId: resultFragmentId,
    globalManager: resultGlobalManager,
  };
};
