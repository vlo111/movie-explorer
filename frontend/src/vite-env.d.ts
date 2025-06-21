declare module '*.svg' {
    import * as React from 'react';

    // For React Components
    export const ReactComponent: React.FunctionComponent<React.ComponentProps<'svg'> & { title?: string }>;

    // For String Imports
    const src: string;
    export default src;
}
