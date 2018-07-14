const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const Chat = require('./model').getModel('chat');
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

app.use(cookieParser());
app.use(bodyParser.json());

app.use('/user', userRoute);

server.listen('9093', () => {
    console.log('Node app start at 9093')
})