import { createContext } from "react";

// interface FragmentsGlobalContextProps {
//   layerKey: LinkKey;
//   manager: GraphState;
//   startLayer?: LinkKey;
// }

export const FragmentsGlobalContext = createContext();

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
