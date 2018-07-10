const express = require('express');
const utils = require('utility'); // md5加密
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');
const _filter = {'pwd': 0, '__v': 0}

Router.get('/list', (req, res) => {
    // User.remove({}, function (err, doc) {})  // 清楚所有数据
    User.find({}, function (err, doc) {
        return res.json(doc)
    })
});

Router.post('/register', (req, res) => {
    const {user, pwd, type} = req.body
    // return res.json({code: 0})
    User.findOne({user: user}, function (err, doc) {
        if (doc) {
            return res.json({code: 1, msg: '用户名重复'})
        }
        const userModel = new User({user, type, pwd: md5Pwd(pwd)})
        userModel.save(function (e, d) {
            if (e) {
                return res.json({code: 1, msg: '后端出错了'})
            }
            const {user, type, _id} = d
            res.cookie('userid', _id)
            return res.json({code: 0, data: {user, type, _id}})
        })
    })
});

Router.post('/login', (req, res) => {
    const {user, pwd} = req.body;
    // return res.json({code: 0})
    User.findOne({user, pwd: md5Pwd(pwd)}, _filter, function (err, doc) {
        if (!doc) {
            return res.json({code: 1, msg: '用户名不存在或者密码错误'});
        }
        res.cookie('userid', doc._id)
        return res.json({code: 0, data: doc});
    })
});

Router.get('/info', (req, res)=> {
    const {userid} = req.cookies
    if (!userid) {
        return res.json({code: 1})
    }
    User.findOne({_id: userid}, _filter, function (err, doc) {
        if (err) {
            return res.json({code: 1, msg: '后端出错了'})
        }
        if (doc) {
            return res.json({code: 0, data: {}})
        }

    })
    return res.json({code: 1})
});

function md5Pwd(pwd) {
    const salt = 'immoc_raoju_355@qqq09983m^%#&#@#'
    return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router
