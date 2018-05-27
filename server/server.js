const express = require('express');
const userRoute = require('./user');

const app = express();
app.use('/user', userRoute);

app.listen('9093', ()=> {
    console.log('Node app start at 9093')
})