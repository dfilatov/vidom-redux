import { Component, IS_DEBUG, console } from 'vidom';

export default class Provider extends Component {
    onInit() {
        const { store } = this.attrs;

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

    onRender() {
        return this.children;
    }
}
