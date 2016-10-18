var express = require('express');
//var weixin = require('wechat-api');
var jsSHA = require('jssha');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var token = 'hellowechat';
    var signature = req.query.signature;
    var timestamp = req.query.timestamp;
    var echostr = req.query.echostr;
    var nonce = req.query.nonce;

    console.log(req.query);
    console.log( 'signature:'+signature );
    console.log( 'timestamp:'+timestamp );
    console.log( 'echostr:'+echostr );
    console.log( 'nonce:'+nonce );

    var oriArray = [];
    oriArray[0] = token;
    oriArray[1] = timestamp;
    oriArray[2] = nonce;
    oriArray.sort();

    var original = oriArray.join('');
    var shaObj = new jsSHA(original, 'TEXT');
    var scyptoString=shaObj.getHash('SHA-1', 'HEX');

    if(signature == scyptoString){
        console.log('success');
        res.status(200).send('token验证成功')
    } else {
        console.log('fail');
        res.status(200).send('token验证失败')
    }

});

module.exports = router;
