import { isLinkKey, LinkKey } from "@graph-state/core";
import { Extender } from "@/types";
import {
  applyObjectValues,
  interpolationObject,
  toSpringFields,
} from "@fragments/utils";
import { valueSetter } from "@/shared/valueSetter.ts";

export const solidFillExtend: Extender = ({
  graph,
  graphKey,
  getValue,
  state,
  resolveField,
}) => {
  /*
   Сохраняем чтобы не реализовывать логику установки переменной
   в значение, нам нужно только менять цвет
   */
  const originalSetSolidFill = graph.setSolidFill;
  const solidFillSetter = valueSetter(state, graphKey, "solidFill");

  /*
  Функция возвращает
  - null или ссылку на переменную
  - Объект с SpringValue полями { r: Spring<num>, g: Spring<num>, b: Spring<num>, a: Spring<num> }
   */
  const getSolidFill = (color) => {
    if (!color || isLinkKey(color)) return color;
    return toSpringFields(color);
  };

  const setSolidFill = (colorOrLink) => {
    const currentValue = resolveField("solidFill");

    /**
     * Есть несколько сценариев работы с цветом:
     * 1. Устанавливают ссылку на цвет, а потом меняют цвет
     * ссылка должна замениться на новый цвет.
     * 2. Просто устанавливают цвет
     * 3. Меняют одну ссылку на другую
     */
    if (
      !isLinkKey(colorOrLink) ||
      (isLinkKey(currentValue) && !isLinkKey(colorOrLink))
    ) {
      if (!localSolidFill || isLinkKey(currentValue)) {
        localSolidFill = getSolidFill(colorOrLink);
        solidFillSetter(interpolationObject(localSolidFill));
      } else {
        /*
        Меняем локальные SpringValue
         */
        applyObjectValues(localSolidFill, colorOrLink);
      }
    } else {
      /*
      Если устанавливаем переменную, то запускаем
      оригинальный setter
       */
      originalSetSolidFill(colorOrLink);
    }
  };

  /*
  Из-за того что в graph.solidFill хранится итоговое интерополируемое значение, а
  когда мы меняем цвет, нам нужно менять SpringValue. Которые находятся внутри этого
  Interpolate. Мы сохраняем их локально, чтобы потом менять
   */
  let localSolidFill = getSolidFill(getValue("solidFill"));

  return {
    solidFill: interpolationObject(localSolidFill),
    setSolidFill,
  };
};
