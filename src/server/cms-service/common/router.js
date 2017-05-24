import React from 'react';
import Root from './components/root';
import Admin from './components/admin';

type Props = {
    path?: string
};

export const routes = new Map();
routes.set('/', <Root />);
routes.set('/admin', <Admin/>);

export default function router(props: Props) {
    return props.path && routes.has(props.path) ? routes.get(props.path) : null;
}
