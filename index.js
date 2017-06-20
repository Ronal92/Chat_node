var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});


/*
	io에 'connection' 이벤트가 발생하면 콜백 함수를 실행하는 형태
*/
io.on('connection', function(socket){
	console.log('one user connected');
	socket.on('client message', function(msg){
		console.log('message: ' + msg);
		io.emit('client message', msg);
	});
	socket.on('disconnect', function(){
		console.log('user disconnected'); // 연결해제	 
	});
});



http.listen(3000, function(){
	console.log('Listening on port 3000');
});

