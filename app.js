

const http = require('http'); // nodeJs에서 module import하는 방법

const routes = require('./routes');

const server = http.createServer(routes); // exectue it for every incoming reqeust. anonymous function 사용하는 방법도잇음
//처음 서버를 만들떄 event를 기다리는 event listner를 register함

server.listen(3000);