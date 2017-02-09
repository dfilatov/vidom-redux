import { Component, node, IS_DEBUG, console } from 'vidom';
import { bindActionCreators } from 'redux';
import shallowEqual from './utils/shallowEqual';

export default (storeStateToAttrs, actionCreators) =>
    ConnectedComponent => class Connector extends Component {
        onInit() {
            const { store } = this.context;

            if(IS_DEBUG) {
                if(!store) {
                    console.error(
                        `Could not find "store" in the context of <${ConnectedComponent.name || 'ConnectedComponent'}>. ` +
                        'Wrap the root component in a <Provider>.');
                }
            }

            this._store = store;
            this._actions = actionCreators && bindActionCreators(actionCreators, store.dispatch);
            this._storeStateAttrs = storeStateToAttrs && storeStateToAttrs(store.getState(), this.attrs);
            this._unsubscribeFromStore = this._storeStateAttrs?
                store.subscribe(this._onStoreUpdate.bind(this)) :
                null;
            this._areStateAttrsChanged = false;
        }

        onRender() {
            return node(ConnectedComponent)
                .setAttrs({
                    ...this._storeStateAttrs,
                    ...this._actions,
                    ...this.attrs
                })
                .setChildren(this.children);
        }

        _onStoreUpdate() {
            const stateAttrs = storeStateToAttrs(this._store.getState(), this.attrs);

            if(!shallowEqual(stateAttrs, this._storeStateAttrs)) {
                this._storeStateAttrs = stateAttrs;
                this._areStateAttrsChanged = true;
                this.update();
            }
        }

        shouldUpdate(prevAttrs, prevChildren) {
            return this._areStateAttrsChanged ||
                !shallowEqual(this.attrs, prevAttrs) ||
                this.children !== prevChildren;
        }

        onUpdate() {
            this._areStateAttrsChanged = false;
        }

        onUnmount() {
            this._unsubscribeFromStore && this._unsubscribeFromStore();
        }
    }
