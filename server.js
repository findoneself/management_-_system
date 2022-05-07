const http = require('http')
const fs = require('fs')
http.createServer((_req, _res) => {
    _res.setHeader('Access-Control-Allow-Origin', '*')
    _res.setHeader('Control-Type', 'video/x-flv')
    fs.createReadStream('http://myeye.xuzhouzhihui.com:9050/camera?device=3301061001680&channel=0&streamtype=0&token=kw494511MYzhY85fdB&type=std.flv')
}).listen(3000, function () {
    console.log('server is running')
})