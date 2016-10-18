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
        console.log('token验证成功');
        res.status(200).send(req.query.echostr);
    } else {
        res.status(200).send('fail');
    }
});

weixin.textMsg(function(msg) {
    console.log("textMsg received");
    console.log(JSON.stringify(msg));

    var resMsg = { };

    switch (msg.content) {
        case "文本" :
            // 返回文本消息
            resMsg = {
                fromUserName : msg.toUserName,
                toUserName : msg.fromUserName,
                msgType : "text",
                content : "这是文本回复",
                funcFlag : 0
            };
            break;

        case "音乐" :
            // 返回音乐消息
            resMsg = {
                fromUserName : msg.toUserName,
                toUserName : msg.fromUserName,
                msgType : "music",
                title : "音乐标题",
                description : "音乐描述",
                musicUrl : "音乐url",
                HQMusicUrl : "高质量音乐url",
                funcFlag : 0
            };
            break;

        case "图文" :

            var articles = [];
            articles[0] = {
                title : "PHP依赖管理工具Composer入门",
                description : "PHP依赖管理工具Composer入门",
                picUrl : "http://weizhifeng.net/images/tech/composer.png",
                url : "http://weizhifeng.net/manage-php-dependency-with-composer.html"
            };

            articles[1] = {
                title : "八月西湖",
                description : "八月西湖",
                picUrl : "http://weizhifeng.net/images/poem/bayuexihu.jpg",
                url : "http://weizhifeng.net/bayuexihu.html"
            };

            articles[2] = {
                title : "「翻译」Redis协议",
                description : "「翻译」Redis协议",
                picUrl : "http://weizhifeng.net/images/tech/redis.png",
                url : "http://weizhifeng.net/redis-protocol.html"
            };

            // 返回图文消息
            resMsg = {
                fromUserName : msg.toUserName,
                toUserName : msg.fromUserName,
                msgType : "news",
                articles : articles,
                funcFlag : 0
            };
            break;
        default:
            resMsg = {
                fromUserName : msg.toUserName,
                toUserName : msg.fromUserName,
                msgType : "text",
                content : "这是文本回复",
                funcFlag : 0
            };
    }

    weixin.sendMsg(resMsg);
});

// 监听图片消息
weixin.imageMsg(function(msg) {
    console.log("imageMsg received");
    console.log(JSON.stringify(msg));
});

// 监听位置消息
weixin.locationMsg(function(msg) {
    console.log("locationMsg received");
    console.log(JSON.stringify(msg));
});

// 监听链接消息
weixin.urlMsg(function(msg) {
    console.log("urlMsg received");
    console.log(JSON.stringify(msg));
});

// 监听事件消息
weixin.eventMsg(function(msg) {
    console.log("eventMsg received");
    console.log(JSON.stringify(msg));
});

// Start
router.post('/', function(req, res) {

    // loop
    weixin.loop(req, res);

});

module.exports = router;
