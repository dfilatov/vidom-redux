import { Component } from 'vidom';

export default class Provider extends Component {
    onInit({ store }) {
        this._childCtx = { store };
    }

    onChildContextRequest() {
        return this._childCtx;
    }

    onRender(_, children) {
        return children;
    }
}
