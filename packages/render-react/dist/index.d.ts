import * as react from 'react';

interface Props {
    FragmentNode: any;
    appendTo?: () => HTMLDivElement | undefined;
}
declare const FragmentsRender: react.ForwardRefExoticComponent<Props & react.RefAttributes<unknown>>;

export { FragmentsRender };
