// export * from "./components/Frame";
import { useLayerDisplay } from "@/shared/hooks/useLayerStyles/useLayerDisplay";

export * from "./components/Fragment";
export { useInstance } from "./components/Instance/hooks/useInstance";
export { useFrame } from "./components/Frame/hooks/useFrame";
export { useFragment } from "./components/Fragment/hooks/useFragment";
export * from "./components/Fragment/FragmentContext";
export { useTextAttributes } from "./components/Text/hooks/useTextAttributes";

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
export { useInjectedStyle } from "@/shared/hooks/useInjectedStyle";
export { useMounted } from "@/shared/hooks/useMounted";

export { processOptionalSize } from "@/shared/hooks/useLayerStyles/useOptionalSize";
export { useLayerSizeValue } from "@/shared/hooks/useLayerStyles/useLayerSizeValue";
export { useLayerDisplay } from "@/shared/hooks/useLayerStyles/useLayerDisplay";
export { useLayerLayout } from "@/shared/hooks/useLayerStyles/useLayerLayout";
export { useCalcLayerBorder } from "@/shared/hooks/useLayerStyles/useCalcLayerBorder";
export { useLayerCssOverride } from "@/shared/hooks/useLayerStyles/useLayerCssOverride";

export { GlobalManager } from "@/providers/GlobalManager";
export * from "@/providers/StyleSheetProvider";
export * from "@/providers/RenderTargetProvider";
export { InstanceContext, Instance } from "@/components/Instance";
export { FragmentContext } from "@/components/Fragment/FragmentContext";

export { createElement, render, hydrate, cloneElement, h } from "preact";
// export { renderToString } from "preact-render-to-string";
