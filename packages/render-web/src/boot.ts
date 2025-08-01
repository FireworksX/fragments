import { createFragmentsClient } from "@fragmentsx/client-core";
import { Instance, Area, render, h } from "@fragmentsx/render-core";
import { isBrowser } from "@fragmentsx/utils";

export const boot = () => {
  let clientInstance: ReturnType<typeof createFragmentsClient> | null = null;

  const init = (apiToken: string) => {
    if (!!clientInstance) return clientInstance;

    clientInstance = createFragmentsClient({ apiToken });

    setTimeout(() => {
      autoRender();
    }, 0);
  };

  const renderInstance = (target: HTMLElement, id: number, props?: unknown) => {
    if (!clientInstance) {
      throw new Error("GlobalManager not init. User .init() before render.");
    }
    render(
      h(Instance, {
        fragmentId: id,
        globalManager: clientInstance,
        props,
      }),
      target
    );
  };

  const renderArea = (target: HTMLElement, areaCode: string) => {
    if (!clientInstance) {
      throw new Error("GlobalManager not init. User .init() before render.");
    }
    render(
      h(Area, {
        areaCode,
        globalManager: clientInstance,
      }),
      target
    );
  };

  const autoRender = () => {
    if (!clientInstance) {
      throw new Error("GlobalManager not init. User .init() before render.");
    }

    if (isBrowser) {
      const allWidgets = document.querySelectorAll(`[data-fgx]`);

      for (const target of allWidgets) {
        if (target instanceof HTMLElement) {
          const id = target.attributes.getNamedItem("data-fgx")?.value;
          const type =
            target.attributes.getNamedItem("data-fgx-type")?.value ?? "area";
          const props = Array.from(target.attributes)
            .filter((attr) => attr.name.startsWith("data-fgx-prop"))
            .reduce((acc, attr) => {
              const propKey = attr.name?.split("-").at(-1);
              acc[propKey] = attr.value;
              return acc;
            }, {});

          if (type === "instance") {
            renderInstance(target, +id, props);
          } else {
            renderArea(target, id);
          }
        }
      }
    }
  };

  return {
    getInstance: () => clientInstance,
    init,
    renderInstance,
    renderArea,
    autoRender,
  };
};
