//this is where the client designs their app
//we need to reterirve components from the database here ..
import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import AppState from '../stores/appstate';

declare var window: ?Object;

type Props = {
    appstate: AppState<string>
};

@inject('appstate')
@observer
export default class Public extends Component {

    static defaultProps = {
        appstate: new AppState()
    };

    props: Props;

    constructor(props: Props) {
        super(props);
        console.log(typeof window === 'object' ? 'client-side' : 'server-side');
    }

    addItem = () => this.props.appstate.addItem('foobar');

    render() {

        const { appstate } = this.props;
        return (
            <div>
                <button onClick={ this.addItem }>foobar</button>
                <ul>
                    {appstate.renderHeader()}
                    { appstate.items.map((item, key) => <li key={ key }>{ item }</li>) }
                </ul>
            </div>
        );
    }
}
