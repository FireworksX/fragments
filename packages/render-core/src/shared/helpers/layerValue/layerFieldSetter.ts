import { isVariableLink, parseLayerField } from "@fragmentsx/definition";
import { set } from "@fragmentsx/utils";
import {
  entityOfKey,
  GraphState,
  LinkKey,
  MutateOptions,
} from "@graph-state/core";

export const layerFieldSetter =
  (
    manager: GraphState,
    layerKey: LinkKey,
    fieldKey: string,
    currentValue?: unknown
  ) =>
  (value: unknown, options?: MutateOptions) => {
    const { success, output } = parseLayerField(
      entityOfKey(layerKey),
      fieldKey,
      value
    );

    if (success) {
      if (isVariableLink(value)) {
        /*
      Если меняем значение на переменную, то сохраняем значение, чтобы
      можно было вызвать restore и восстановить значение, которое
      было до установки переменной
       */
        manager.mutate(manager?.$fragment?.temp, {
          [layerKey]: {
            [fieldKey]: currentValue,
          },
        });
      }

      manager.mutate(
        layerKey,
        (prev) => {
          set(prev, fieldKey, output);
          return prev;
        },
        options
      );
    }
  };
