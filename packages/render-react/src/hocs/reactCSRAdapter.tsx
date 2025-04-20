import React, { Suspense, useContext, useEffect, useRef } from "react";
import { hydrate, createElement, render } from "@fragmentsx/render-core";
import { GlobalManagerContext } from "@/components/GlobalManager";

export function reactCSRAdapter(PreactComponent: any) {
  return function ReactCSRWrapper(props: any) {
    const globalManager = useContext(GlobalManagerContext);
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    // Используем React-эффект для управления жизненным циклом Preact-компонента
    const hasHydrated = useRef(false);

    useEffect(() => {
      if (containerRef.current) {
        if (!hasHydrated.current) {
          hydrate(
            createElement(PreactComponent, {
              ...props,
              globalManager: props?.globalManager ?? globalManager,
            }),
            containerRef.current
          );
          hasHydrated.current = true;
        } else {
          render(
            createElement(PreactComponent, {
              ...props,
              globalManager: props?.globalManager ?? globalManager,
            }),
            containerRef.current
          );
        }
      }

      return () => {
        if (containerRef.current) {
          render(null, containerRef.current);
        }
      };
    }, [props, globalManager]);

    // Возвращаем React-элемент, который будет контейнером для Preact-компонента
    return <div suppressHydrationWarning ref={containerRef} />;
  };
}
