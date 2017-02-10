# vidom-redux [![Build Status](https://secure.travis-ci.org/dfilatov/vidom-redux.png)](http://travis-ci.org/dfilatov/vidom-redux) [![npm version](https://badge.fury.io/js/vidom-redux.svg)](http://badge.fury.io/js/vidom-redux)

## What is it?

This module provides [Redux](https://github.com/reactjs/redux) bindings for [Vidom](https://github.com/dfilatov/vidom).

## Installation

```
npm i vidom-redux
```

## API

This module provides:
  * [`<Provider>`](#provider) to make store available in the component hierarchy below
  * [`connect`](#connect) to connect arbitrary Vidom component to a Redux store

### Provider

Provider expects `store` attribute to be passed.
```jsx
import { mount } from 'vidom';
import { createStore } from 'redux';
import { Provider } from 'vidom-redux';
import App from './components/App';
import reducer from './reducers';

const store = createStore(reducer);

mount(
    document.getElementById('root'),
    <Provider store={ store }>
        <App/>
    </Provider>);
```

### connect

`connect` wraps and connects given component to a new one which is connected to a store.

  * *[{Function(storeState, ownAttrs): Object}]* `storeStateToAttrs` maps store state to attributes of wrapped component 
  * *[{Object}]* `actionCreators` action creators to be bound to store

It returns a function to wrap given component.

```js
import { Component } from 'vidom';
import { connect } from 'vidom-redux';
import * as actions from '../actions';

class MyComponent extends Component {
    ...
}

const storeStateToAttrs = ({ subState1, subState2 }) => ({ subState1, subState2 }),
    MyConnectedComponent = connect(storeStateToAttrs, actions)(MyComponent);

```
