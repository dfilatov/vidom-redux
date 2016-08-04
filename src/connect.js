import { Component, node } from 'vidom';
import { bindActionCreators } from 'redux';
import shallowEqual from './utils/shallowEqual';

export default (stateToAttrs, actionCreators) => {
    const boundActionCreators = dispatch => bindActionCreators(actionCreators, dispatch);

    return ConnectedComponent => class Connector extends Component {
        onInit() {
            const { store } = this.getContext();

            this._store = store;
            this._actions = actionCreators && boundActionCreators(store.dispatch);
            this._stateAttrs = stateToAttrs && stateToAttrs(store.getState());
            this._unsubscribeFromStore = this._stateAttrs?
                store.subscribe(this._onStoreUpdate.bind(this)) :
                null;
            this._areStateAttrsChanged = false;
        }

        onRender(attrs, children) {
            return node(ConnectedComponent)
                .attrs({
                    ...this._stateAttrs,
                    ...this._actions,
                    ...attrs
                })
                .children(children);
        }

        _onStoreUpdate() {
            const stateAttrs = stateToAttrs(this._store.getState(), this.getAttrs());

            if(!shallowEqual(stateAttrs, this._stateAttrs)) {
                this._stateAttrs = stateAttrs;
                this._areStateAttrsChanged = true;
                this.update();
            }
        }

        shouldUpdate(nextAttrs, prevAttrs, nextChildren, prevChildren) {
            return this._areStateAttrsChanged ||
                !shallowEqual(nextAttrs, prevAttrs) ||
                nextChildren !== prevChildren;
        }

        onUpdate() {
            this._areStateAttrsChanged = false;
        }

        onUnmount() {
            this._unsubscribeFromStore && this._unsubscribeFromStore();
        }
    };
}
