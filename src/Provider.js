import { Component, node } from 'vidom';

export default class Provider extends Component {
    onInit({ store }) {
        this._childCtx = { store };
    }

    onChildContextRequest() {
        return this._childCtx;
    }

    onRender(_, children) {
        return Array.isArray(children)?
            children.length > 1?
                node('fragment').children(children) :
                children[0] :
            children;
    }
}
