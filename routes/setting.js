const express = require('express');
const router = express.Router();
const {
    connect,
    insert,
    find,
    ObjectId,
    update,
    del
} = require("../libs/mongo.js");
let token = require("../libs/token.js")
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
// 查询
router.get('/billList', async (req, res, next) => {
    let {
        name
    } = req.query
    console.log(name)
    let data = await find(`list`, name ? {
        name
    } : {})
    res.send(data);
});
// 增
router.get('/billAdd', async (req, res, next) => {
    let {
        name,
        asupplierge,
        price,
        pay,
        time
    } = req.query
    // console.log(name)
    let data = await insert(`list`, [{
        name: name,
        asupplierge: asupplierge,
        price: price,
        pay: pay,
        time: time
    }])
    res.send(data);
});
// 改
router.get('/billUpdate', async (req, res, next) => {
    let {
        id,
        val1,
        val2,
        val3,
        val4,
        val5
    } = req.query
    await update('list', { _id: ObjectId(id) }, {
        name: val1,
        asupplierge: val2,
        price: val3,
        pay: val4,
        time: val5
    });

});
// 删
router.get('/updata', async (req, res, next) => {
    let {
        _id
    } = req.query
    let data = await del('list', { _id: ObjectId(_id) });
    res.send('succes');
});
// 查（登录）
router.post('/login', async (req, res, next) => {
    let {
        user,
        mima
    } = req.body
    let data = await find(`username`, user ? {
        user
    } : {})
    // console.log(user,mima);
    if (data.length == 0) {
        res.send({status:'fail'});
    } else if (data[0].mima == mima) {
        res.send({
            status:'success',
            token: token.createToken({
                user,
                mima
            },60)
        });
    } else {
        res.send({status:'fail'});
    }
});
router.post('/autoLogin', async (req, res, next) =>{
    res.send(token.checkToken(req.headers.token)); 
});
module.exports = router;