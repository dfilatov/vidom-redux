# vidom-redux [![Build Status](https://secure.travis-ci.org/dfilatov/vidom-redux.png)](http://travis-ci.org/dfilatov/vidom-redux) [![npm version](https://badge.fury.io/js/vidom-redux.svg)](http://badge.fury.io/js/vidom-redux)

## What is it?

This module provides [Redux](https://github.com/reactjs/redux) bindings for [Vidom](https://github.com/dfilatov/vidom).

## Installation

```
npm i vidom-redux
```

## API

This module provides:
  * `<Provider>` to make store available in the component hierarchy below
  * `connect` to connect arbitrary Vidom component to a Redux store

### Provider

Provider expects `store` attribute to be passed.
```js
import { mountToDom } from 'vidom';
import { createStore } from 'redux';
import { Provider } from 'vidom-redux';
import App from './components/App';
import reducer from './reducers';

const store = createStore(reducer);

mountToDom(
    document.getElementById('root'),
    <Provider store={ store }>
        <App/>
    </Provider>);
```

### connect

