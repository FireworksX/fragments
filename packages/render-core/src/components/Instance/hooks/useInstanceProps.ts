import { InstanceContext, InstanceProps } from "@/components/Instance";
import { useContext, useMemo } from "preact/compat";
import { FragmentContext } from "@/components/Fragment/FragmentContext";
import { omit } from "@fragmentsx/utils";
import { useGraph, useGraphStack } from "@graph-state/react";
import { isVariableLink } from "@/shared/helpers/checks";
import { useReadVariable } from "@/shared/hooks/useReadVariable";
import { useFragmentManager } from "@/shared/hooks/useFragmentManager";

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
export const useInstanceProps = (instanceProps: InstanceProps) => {
  const isTopInstance = !instanceProps?.layerKey;
  const { manager: loadedManager } = useFragmentManager(
    isTopInstance ? instanceProps?.fragmentId : null
  );
  const { manager: fragmentContextManager } = useContext(FragmentContext);

  const fragmentManager = isTopInstance
    ? loadedManager
    : fragmentContextManager;

  const { readVariable } = useReadVariable(null, fragmentManager);

  const [instanceLayer] = useGraph(fragmentManager, instanceProps.layerKey);
  const instanceLayerProps = instanceLayer?.props ?? {};

  const mergedProps = useMemo(() => {
    let base = instanceLayerProps;

    if (isTopInstance && fragmentManager) {
      const defs =
        fragmentManager?.resolve(fragmentManager?.$fragment?.root)
          ?.properties ?? [];

      defs.forEach((definition) => {
        const resolvedDefinition = fragmentManager?.resolve(definition);
        const defId = resolvedDefinition._id;

        base[defId] =
          instanceProps?.props?.[defId] ?? readVariable(definition)?.value;
      });
    }

    return omit(base, "_type", "_id");
  }, [isTopInstance, fragmentManager, instanceLayerProps]);

  const drilledProps = Object.values(mergedProps).filter(isVariableLink);
  const resolveDrilledProps = useGraphStack(fragmentManager, drilledProps);

  /**
   * TODO
   * В будущем нужно будет открепить drilled переменные, сейчас они
   * крепятся к инстансу, который их использует, а должен браться от родительского
   * инстанса.
   */

  const resultProps = useMemo(() => {
    const props = { ...mergedProps };

    // resolveDrilledProps.forEach((variable) => {
    //   props[variable?._id] = readVariable(
    //     fragmentManager.keyOfEntity(variable)
    //   ).value;
    // });

    return props;
  }, [resolveDrilledProps, mergedProps]);

  const cssProps = Object.entries(resultProps).reduce((acc, [key, value]) => {
    if (isVariableLink(value)) {
      const nestedVariableId = fragmentManager.entityOfKey(value)?._id;
      value = `var(--${nestedVariableId})`;
    }

    acc[`--${key}`] = value;
    return acc;
  }, {});

  return {
    props: resultProps,
    cssProps,
  };
};
