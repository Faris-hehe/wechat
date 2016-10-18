var express = require('express');
//var wechat = require('wechat');
var weixin = require('weixin-api');
//var weixin = require('wechat-api');
//var jsSHA = require('jssha');
var router = express.Router();

weixin.token = 'hellowechat';
/* GET home page. */
//router.get('/', function(req, res, next) {
//    var token = 'hellowechat';
//    var signature = req.query.signature;
//    var timestamp = req.query.timestamp;
//    var echostr = req.query.echostr;
//    var nonce = req.query.nonce;
//
//    console.log(req.query);
//    console.log( 'signature:'+signature );
//    console.log( 'timestamp:'+timestamp );
//    console.log( 'echostr:'+echostr );
//    console.log( 'nonce:'+nonce );
//
//    var oriArray = [];
//    oriArray[0] = token;
//    oriArray[1] = timestamp;
//    oriArray[2] = nonce;
//    oriArray.sort();
//
//    var original = oriArray.join('');
//    var shaObj = new jsSHA(original, 'TEXT');
//    var scyptoString=shaObj.getHash('SHA-1', 'HEX');
//
//    if(signature == scyptoString){
//        console.log('token succesed');
//        res.status(200).send(echostr)
//    } else {
//        console.log('token failed');
//        res.status(200).send('token验证失败')
//    }
//
//});
//
//router.post('/', function(req, res, next) {
//    res.send(req.query)
//});

router.get('/',function(req,res,next){
    if (weixin.checkSignature(req)) {
        console.log('token验证成功')；
        res.status(200).send(req.query.echostr);
    } else {
        res.status(200).send('fail');
    }
});


module.exports = router;
