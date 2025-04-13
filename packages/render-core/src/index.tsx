// export * from "./components/Frame";
export * from "./components/Fragment";
export * from "./components/Instance";

// export { createManager } from "@/shared/managers/createManager";
// export * from "./components/Instance";
// export * from "./components/FragmentsGlobalContext";
// export { createManager } from "./lib/createManager.ts";
// export * from "./lib/createGlobalContext";
export * from "./shared/helpers";
// export * from "./lib/renderTarget.ts";
// export { useLayerValue } from "./shared/hooks/useLayerValue.ts";
// export { useLayerValue$ } from "./shared/hooks/useLayerValue$.ts";
// export { useLayerVariableValue } from "./shared/hooks/useLayerVariableValue.ts";
// export { useRenderTarget } from "./shared/hooks/useRenderTarget.ts";
// export { useTextContent } from "./shared/hooks/useTextContent.ts";
// export { useInstanceDefinition } from "./shared/hooks/useInstanceDefinition.ts";
// export { useInstancePropertyValue } from "./shared/hooks/useInstancePropertyValue.ts";
// export { useLayer } from "./shared/hooks/useLayer.ts";

// export { useGlobalContext } from "./shared/hooks/useGlobalContext";

export { createGlobalManager } from "@/managers/globalManager";

export { wrapTextInParagraphWithAttributes } from "@/shared/helpers/wrapTextInParagraphWithAttributes";
export { findBreakpoint } from "@/shared/helpers/findBreakpoint";

export { useRenderTarget } from "@/shared/hooks/useRenderTarget";
export { useGlobalManager } from "@/shared/hooks/useGlobalManager";
export { useFragmentManager } from "@/shared/hooks/useFragmentManager";
export { useFragmentProperties } from "@/shared/hooks/useFragmentProperties";
export { useReadVariable } from "@/shared/hooks/useReadVariable";
export { useLayerChildren } from "@/shared/hooks/useLayerChildren";
export { useNormalizeLayer } from "@/shared/hooks/useNormalizeLayer";
export { useLayerValue } from "@/shared/hooks/useLayerValue";
export { useTextContent } from "@/shared/hooks/useTextContent";
export { useFragmentChildren } from "@/shared/hooks/useFragmentChildren";
export { GlobalManager } from "@/providers/GlobalManager";
export { InstanceContext } from "@/components/Instance";
export { FragmentContext } from "@/components/Fragment/FragmentContext";

export { createElement, render } from "preact";
