var NodeRSA = require('node-rsa');

var key = new NodeRSA({b: 512});//生成512位秘钥
var pubkey = key.exportKey('pkcs8-public');//导出公钥
var prikey = key.exportKey('pkcs8-private');//导出私钥
var pubKey = new NodeRSA(pubKey,'pkcs8-public');//导入公钥
var priKey = new NodeRSA(priKey,'pkcs8-private');//导入私钥
console.log(key)