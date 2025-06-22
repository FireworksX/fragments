import { InstanceProps } from "@/components/Instance";
import { useContext, useMemo } from "preact/compat";
import { FragmentContext } from "@/components/Fragment/FragmentContext";
import { omit } from "@fragmentsx/utils";
import { useGraph, useGraphStack } from "@graph-state/react";
import { isVariableLink } from "@/shared/helpers/checks";
import { useReadVariable } from "@/shared/hooks/useReadVariable";

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
  const { manager: parentManager } = useContext(FragmentContext);
  const { readVariable } = useReadVariable();

  const [instanceLayer] = useGraph(parentManager, instanceProps.layerKey);
  const instanceLayerProps = instanceLayer?.props ?? {};

  const mergedProps = omit(
    { ...instanceLayerProps, ...(instanceProps.props ?? {}) },
    "_type",
    "_id"
  );

  const drilledProps = Object.values(mergedProps).filter(isVariableLink);
  const resolveDrilledProps = useGraphStack(parentManager, drilledProps);

  const resultProps = useMemo(() => {
    const props = { ...mergedProps };

    resolveDrilledProps.forEach((variable) => {
      props[variable?._id] = readVariable(
        parentManager.keyOfEntity(variable)
      ).value;
    });

    return props;
  }, [resolveDrilledProps, mergedProps]);

  const cssProps = Object.entries(resultProps).reduce((acc, [key, value]) => {
    acc[`--${key}`] = value;
    return acc;
  }, {});

  return {
    props: resultProps,
    cssProps,
  };
};
