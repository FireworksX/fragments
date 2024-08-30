import { Layer } from "../Layer/Layer.performance";
import { useCurrentBreakpoint } from "./hooks/useCurrentBreakpoint.performance";

export const Fragment = (_props: any) => {
  const { containerRef, currentBreakpoint } = useCurrentBreakpoint();

  return (
    <div ref={containerRef}>
      <Layer {...currentBreakpoint} />
    </div>
  );
};
