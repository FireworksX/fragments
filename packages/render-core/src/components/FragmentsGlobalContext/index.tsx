import { createContext } from "preact/compat";
import { FRAGMENTS_GLOBAL_CONTEXT } from "@/lib/createGlobalContext";

// interface FragmentsGlobalContextProps {
//   layerKey: LinkKey;
//   manager: GraphState;
//   startLayer?: LinkKey;
// }

export const FragmentsGlobalContext = createContext(FRAGMENTS_GLOBAL_CONTEXT);

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
