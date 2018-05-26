import React from 'react';
import ReactDOM from 'react-dom';
import { createStore , applyMiddleware , compose} from 'redux';
import { createLogger } from 'redux-logger' // 利用redux-logger打印日志
import thunk from 'redux-thunk';
//引入redux-devtools-extension的可视化工具（有点吊）
import { composeWithDevTools } from 'redux-devtools-extension';//devToolsEnhancer,
import { Provider } from 'react-redux'
import { counter  } from './index.redux.index.js'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// 调用日志打印方法 collapsed是让action折叠，看着舒服点
const loggerMiddleware = createLogger({
    collapsed: true,
    duration: true
});
// 创建一个中间件集合
const middleware = [thunk, loggerMiddleware];

//const reduxDevtools = window.devToolsExtension?window.devToolsExtension():()=>{}
const store = createStore(counter,compose(
    applyMiddleware(...middleware)
));


ReactDOM.render(
( <Provider store={store}>
    <App />
</Provider> )
, document.getElementById('root'));


registerServiceWorker();
