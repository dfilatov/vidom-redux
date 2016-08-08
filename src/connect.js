import { Component, node, IS_DEBUG, console } from 'vidom';
import { bindActionCreators } from 'redux';
import shallowEqual from './utils/shallowEqual';

export default (storeStateToAttrs, actionCreators) =>
    ConnectedComponent => class Connector extends Component {
        onInit(attrs) {
            const { store } = this.getContext();

            if(IS_DEBUG) {
                if(!store) {
                    console.error(
                        `Could not find "store" in the context of <${ConnectedComponent.name || 'ConnectedComponent'}>. ` +
                        'Wrap the root component in a <Provider>.');
                }
            }

            this._store = store;
            this._actions = actionCreators && bindActionCreators(actionCreators, store.dispatch);
            this._storeStateAttrs = storeStateToAttrs && storeStateToAttrs(store.getState(), attrs);
            this._unsubscribeFromStore = this._storeStateAttrs?
                store.subscribe(this._onStoreUpdate.bind(this)) :
                null;
            this._areStateAttrsChanged = false;
        }

        onRender(attrs, children) {
            return node(ConnectedComponent)
                .attrs({
                    ...this._storeStateAttrs,
                    ...this._actions,
                    ...attrs
                })
                .children(children);
        }

        _onStoreUpdate() {
            const stateAttrs = storeStateToAttrs(this._store.getState(), this.getAttrs());

            if(!shallowEqual(stateAttrs, this._storeStateAttrs)) {
                this._storeStateAttrs = stateAttrs;
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
    }
