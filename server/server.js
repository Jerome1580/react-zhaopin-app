import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import model from './model'
import path from 'path';

import React from 'react'
import {renderToString, renderToStaticMarkup} from 'react-dom/server'
// react 组件 => div
const Chat = model.getModel('chat');
const app = express();
// work with express 和express配合,和http绑定
const server = require('http').Server(app);

const io = require('socket.io')(server);
io.on('connection', function (socket) {
    // socket 是当前这次链接
    // console.log('user login');
    socket.on('sendmsg', function (data) {
        const {from, to, msg} = data
        const chatid = [from, to].sort().join('_')
        Chat.create({chatid, from, to, content: msg}, (err, doc) => {
            //console.log(doc);
            // doc._doc 和 doc 是一样的
            io.emit('recvmsg', Object.assign({}, doc._doc))
        })
        // 广播到全局
        // io.emit('recvmsg', data)
    })
})

const userRoute = require('./user');

function App() {
    return (
        <div>
            <h2>server rendder</h2>
            <h2>server rendder</h2>
        </div>
    )
}

console.log(renderToString(App()));
// <div data-reactroot=""><h2>server rendder</h2><h2>server rendder</h2></div>

console.log(App);

app.use(cookieParser());
app.use(bodyParser.json());

app.use('/user', userRoute);
app.use((req, res, next) => {
    if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
        return next()
    }
    return res.sendFile(path.resolve('build/index.html'))
})

// src 外层是根目录，外层下的build,所有静态资源访问的路径
app.use('/', express.static(path.resolve('build')))

server.listen('9093', () => {
    console.log('Node app start at 9093')
})