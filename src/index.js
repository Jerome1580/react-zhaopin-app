import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { counter , add_Gun , remove_Gun } from './index.redux.index.js'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(counter)

function render(){
    ReactDOM.render(<App store={store} ADD_GUN={add_Gun} REMOVE_GUN={remove_Gun}/>, document.getElementById('root'));
}

render()
store.subscribe(render)


registerServiceWorker();
