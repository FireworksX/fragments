import { createContext } from "preact/compat";
// import { getGlobalManager } from "@/managers/globalManager";

// interface FragmentsGlobalContextProps {
//   layerKey: LinkKey;
//   manager: GraphState;
//   startLayer?: LinkKey;
// }

export const GlobalManager = createContext(null);

// export const FragmentsGlobalContext: FC<FragmentsGlobalContextProps> = ({
//   manager,
//   layerKey,
// }) => {
//   if (!manager) {
//     throw new Error("Cannot render Fragment without manager");
//   }
//
//   const { ref, children } = useFragment(manager, layerKey);
//
//   return (
//     <FragmentProvider manager={manager}>
//       <div ref={ref} data-key={layerKey}>
//         {children.map((childLink) => (
//           <Frame key={childLink} layerKey={childLink} />
//         ))}
//       </div>
//     </FragmentProvider>
//   );
// };
