const express = require('express');
const utils = require('utility'); // md5加密
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');
const Chat = model.getModel('chat');
const _filter = {'pwd': 0, '__v': 0}
Router.get('/list', (req, res) => {
    // User.remove({}, function (err, doc) {})  // 清楚所有数据
    const {type} = req.query
    User.find({type}, function (err, doc) {
        return res.json({code: 0, data: doc})
    })
});

Router.post('/update', (req, res) => {
    const {userid} = req.cookies;
    if (!userid) {
        return res.dumps({code: 1})
    }
    const body = req.body;
    User.findByIdAndUpdate(userid, body, (err, doc) => {
        // 因为node没有添加支持es6的，所以用Object.assign
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type,
        }, body)
        res.json({code: 0, data})
    })
})

Router.post('/register', (req, res) => {
    const {user, pwd, type} = req.body;
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
    User.findOne({user, pwd: md5Pwd(pwd)}, _filter, function (err, doc) {
        if (!doc) {
            return res.json({code: 1, msg: '用户名不存在或者密码错误'});
        }
        res.cookie('userid', doc._id)
        return res.json({code: 0, data: doc});
    })
});

Router.get('/info', (req, res)=> {
    const {userid} = req.cookies;
    if (!userid) {
        return res.json({code: 1})
    }
    User.findOne({_id: userid}, _filter, function (err, doc) {
        if (err) {
            return res.json({code: 1, msg: '后端出错了'})
        }
        if (doc) {
            return res.json({code: 0, data: doc})
        }
    })
});

// 获取聊天信息
Router.get('/getmsglist', (req, res) => {
    const {userid} = req.cookies;

    User.find({}, (err, doc) => {
        let users = {}
        doc.forEach(v => {
            users[v._id] = {name: v.user, avatar: v.avatar}
        })

        // {'$or':[{'from':userid,'to':userid}]}
        Chat.find({'$or': [{'from': userid}, {'to': userid}]}, (err, doc) => {
            if (!err) {
                return res.json({code: 0, msgs: doc, users})
            }
        })
    })

});

// 已读信息
Router.post('/readmsg', (req, res) => {
    const {userid} = req.cookies;
    const {from} = req.body
    console.log(userid, from);
    Chat.update(
        {from, to: userid},
        {'$set': {read: true}},
        {'multi': true},  // 默认修改1行，加上multi可以修改多行
        (err, doc) => {
            console.log(doc);
            if (!err) {
                return res.json({code: 0, num: doc.nModified})
            }
            return res.json({code: 1, msgs: '修改失败'})
        })


});
function md5Pwd(pwd) {
    const salt = 'immoc_raoju_355@qqq09983m^%#&#@#'
    return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router
