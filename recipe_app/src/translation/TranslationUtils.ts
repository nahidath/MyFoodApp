import { ReactNode } from 'react';

export const traverseComponentTree = (component: ReactNode, callback: (component: ReactNode) => void) => {
    if (Array.isArray(component)) {
        component.forEach((child) => traverseComponentTree(child, callback));
    } else if (component && typeof component === 'object' && 'props' in component) {
        callback(component);

        if ('children' in component.props) {
            traverseComponentTree(component.props.children, callback);
        }
    }
};
