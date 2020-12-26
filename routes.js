const fs = require("fs");

const requestHandler = (req,res) => {
    const url = req.url;
    const method = req.method;

    if(url === '/'){
        res.setHeader('Content-Type', 'text/html'); //어떤 타입의 데이터를 response로 보낼지 Content-Type
        res.write('<html>');
        res.write('<head><title>My First Page </title><head>');
        res.write('<bode><form action="/message" method="POST"><input type="text" name="message"><button type="submit"></button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if(url === '/message' && method === 'POST'){
        const body = [];
        req.on('data', (chunk) => { //data가 chunk로 나눠져서 여러번 옴
            console.log(chunk);
            body.push(chunk);
        });
    
        return req.on('end', () => { //event listner to be executed.
            const parseBody = Buffer.concat(body).toString();
            console.log(parseBody);
            const message = parseBody.split('=')[1];
            fs.writeFile('message.txt', message, err =>{ //Sync붙이면 Synchronous를 위한것 이파일이 생길때까지 기다리는거 다른 event도 기다림
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });// write가 다되면 err => 이거 function call됨 혹은 다 써졌을꼉우는 null이 parameter로 따라서 이중 function call임
        }); //event listner 가 동작하고 있는데 밑에 코드가 동작될수도 있음.
        //그래서 event listner 밑에 있는게 event listner와 종속된다면 문제 발생할수있어서 왠만하면 event listner안에 넣는게좋음
        //node js는 envent registry가 있음 거기서 event가 발생할떄마다 어떤 event listner를 call해야 될지 look up하고 call 함.
        //처음 여기 flow를 타면 먼저 event handler들을 register해주고 밑에 코드가 실행됨 
    }
    
    res.setHeader('Content-Type', 'text/html'); //어떤 타입의 데이터를 response로 보낼지 Content-Type
    res.write('<html>');
    res.write('<head><title>My First Page </title><head>');
    res.write('<bode><h1>Hello from my Node.Js server!</h1></body>');
    res.write('</html>');
    res.end();
}

module.exports = requestHandler; //module.exports에 모든지 register할수있음.