import { Component, node } from 'vidom';
import { bindActionCreators } from 'redux';
import shallowEqual from './utils/shallowEqual';

export default (stateToAttrs, actions) => {
    const wrappedActionCreators = dispatch => bindActionCreators(actions, dispatch);

    return ConnectedComponent => class Connector extends Component {
        onInit() {
            const { store } = this.getContext();

            this._store = store;
            this._actions = actions && wrappedActionCreators(store.dispatch);
            this._stateAttrs = stateToAttrs(store.getState());
            this._unsubscribeFromStore = store.subscribe(this._onStoreUpdate.bind(this));
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
            const stateAttrs = stateToAttrs(this._store.getState());

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
            this._unsubscribeFromStore();
        }
    };
}
