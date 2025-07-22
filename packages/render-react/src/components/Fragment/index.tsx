import {
  FC,
  isValidElement,
  useContext,
  useEffect,
  useLayoutEffect,
} from "react";
import { LinkKey } from "@graph-state/core";
import { Frame } from "@/components/Frame";
import { definition } from "@fragmentsx/definition";
import {
  FragmentContext,
  StyleSheetProvider,
  useFragment,
  useFragmentManager,
  useGlobalManager,
} from "@fragmentsx/render-core";

interface FragmentProps {
  globalManager?: unknown;
  fragmentId: string;
  startLayer?: LinkKey;
}

import { ReactNode } from "react";
import { isBrowser } from "@/helpers/isBrowser";

interface ExecuteOnlyProps {
  children: ReactNode;
}

function traverse(node: ReactNode) {
  if (Array.isArray(node)) {
    node.forEach(traverse);
    return;
  }

  if (isValidElement(node)) {
    // Если элемент валидный React-элемент:
    // 1. Вызываем его type (компонент)
    const { type, props } = node;

    if (typeof type === "function") {
      // Если это функция-компонент, вызываем её
      type(props);
    }

    // Рекурсивно обходим детей
    if (props?.children) {
      traverse(props.children);
    }
  }
}

export function ExecuteOnly({ children }: ExecuteOnlyProps) {
  // Выполняем вложенные хуки и код
  traverse(children);

  // Ничего не рендерим
  return null;
}

const FragmentInternal: FC<FragmentProps> = ({ fragmentId, globalManager }) => {
  const { setRef, children, fragmentContext, hash, isResize } = useFragment(
    fragmentId,
    globalManager
  );

  if (!fragmentContext.manager) return null;

  return (
    <div
      // ref={setRef}
      data-key={`${definition.nodes.Fragment}:${fragmentId}`}
      className={hash}
    >
      {children.map((childLink) => {
        const childLayer = fragmentContext.manager?.resolve(childLink);
        const isPrimary = childLayer?.isPrimary ?? false;

        return (
          <Frame
            key={childLink}
            layerKey={childLink}
            hidden={!isResize && !isPrimary}
            // style={{ display: isPrimary ? null : "none" }}
          />
        );
      })}
    </div>
  );
};

export const Fragment = (props) => {
  const { manager: resultGlobalManager } = useGlobalManager();
  const { manager } = useFragmentManager(props.fragmentId, resultGlobalManager);

  return (
    <FragmentContext.Provider value={{ manager }}>
      {/*<StyleSheetProvider value={manager?.styleSheetCache}>*/}
      <FragmentInternal {...props} />
      {/*</StyleSheetProvider>*/}
    </FragmentContext.Provider>
  );
};
