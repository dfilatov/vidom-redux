import { Component, node, IS_DEBUG, console } from 'vidom';

export default class Provider extends Component {
    onInit({ store }) {
        if(IS_DEBUG) {
            if(!store) {
                console.error('Could not find "store" in the attributes of <Provider>.');
            }
        }

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
