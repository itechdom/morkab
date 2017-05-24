import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';

import Router from '../common/router';
import AppState from '../common/stores/appstate';

const appstate = new AppState(window.__INITIAL_STATE__);

render(
    <Provider appstate={ appstate }>
        <Router path={ window.location.pathname }/>
    </Provider>,
    document.getElementById('root')
);
