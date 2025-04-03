import React, { useContext } from "react";
import { render, createElement } from "@fragmentsx/render-core";
import { GlobalManager } from "@/components/GlobalManager";

// Обёртка для Preact-компонента
export function createReactComponent(PreactComponent: any) {
  return function ReactWrapper(props: any) {
    const globalManager = useContext(GlobalManager);
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    // Используем React-эффект для управления жизненным циклом Preact-компонента
    React.useEffect(() => {
      if (containerRef.current) {
        // Рендерим Preact-компонент внутрь контейнера
        render(
          createElement(PreactComponent, {
            ...props,
            globalManager: props?.globalManager ?? globalManager,
          }),
          containerRef.current
        );
      }

      // Очищаем Preact-компонент при размонтировании
      return () => {
        if (containerRef.current) {
          render(null, containerRef.current);
        }
      };
    }, [props, globalManager]); // Зависимость от props, чтобы обновлять компонент при их изменении

    // Возвращаем React-элемент, который будет контейнером для Preact-компонента
    return React.createElement("div", { ref: containerRef });
  };
}
