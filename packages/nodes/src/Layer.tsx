import { OnClickSelectorOptions } from "@adstore/web/src/widgets/Builder/hooks/useBuilderLayerRefs.ts";
import { FC, PropsWithChildren, useContext } from "preact/compat";
import { GraphState } from "@graph-state/core";
import { useGraph } from "@graph-state/react";
import { omit } from "@adstore/utils";
import { useParseRules } from "../hooks/usePageRules/useParseRules.ts";
import { GraphStateContext } from "./GraphStateProvider.tsx";

interface LayerProps extends PropsWithChildren {
  graphState: GraphState;
  layerKey: string;
  mode?: "development";
  onClick?: (e, options: OnClickSelectorOptions) => void;
}

const builderNodes = {};

export const Layer: FC<LayerProps> = ({ layerKey, mode, onClick, ...rest }) => {
  const { graphState } = useContext(GraphStateContext);

  const isDevelopment = mode === "development";
  const componentContext = {}; //useContext(ComponentContext);
  const layerValue = useGraph(graphState, layerKey);

  // const options = omit(rest, "id", "componentKey");
  const { cssRules, attrs, textContent, children } = useParseRules(layerKey);
  //
  if (!layerValue) return null;

  const Tag = attrs.TagName || "div";
  //
  const proxyOnClick = (e: any) => {
    if (onClick) {
      onClick(e, {
        layerKey,
        ...componentContext,
      });
    }
  };

  // if (
  //   layerValue?._type === builderNodes.Component &&
  //   layerKey !== componentContext.componentKey
  // ) {
  //   const onClick = isDevelopment
  //     ? !componentContext.componentKey && options.onClick
  //     : options.onClick;
  //
  //   return <Component componentKey={layerKey} {...options} onClick={onClick} />;
  // }
  //
  // if (layerValue?._type === builderNodes.ComponentInstance) {
  //   /**
  //    * В Dev режиме можно кликать только на компонент верхнего уровня
  //    */
  //   const onClick = isDevelopment
  //     ? !componentContext.componentKey && options.onClick
  //     : options.onClick;
  //
  //   return (
  //     <div data-key={layerKey} onClick={proxyOnClick}>
  //       <ComponentInstance
  //         instanceKey={layerKey}
  //         {...options}
  //         onClick={onClick}
  //       />
  //     </div>
  //   );
  // }

  // if (layerValue?._type === builderNodes.Text) {
  //   return (
  //     <div
  //       data-key={layerKey}
  //       style={cssRules}
  //       {...options}
  //       {...attrs}
  //       onClick={proxyOnClick}
  //     >
  //       {textContent}
  //     </div>
  //   );
  // }

  return (
    <Tag data-key={layerKey} style={cssRules} onClick={proxyOnClick}>
      {(children || []).map((child) => (
        <Layer
          key={child}
          // componentKey={componentContext.componentKey}
          layerKey={child}
          onClick={onClick}
        />
      ))}
    </Tag>
  );
};
