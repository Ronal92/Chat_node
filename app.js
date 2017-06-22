var socketio = require('socket.io')
 , express = require('express')
 , http = require('http')
 , fs = require('fs')
 , path = require('path');
 
 var app = express();
 app.use(express.static(path.join(__dirname, 'public')));
 app.set('port', 3001);

var server = http.createServer(app);
server.listen(app.get('port'), function(){
	console.log("Server listening on port" + app.get('port'));
});

app.get('/', function (req, res){
	fs.readFile('chat.html', function(error, data){
		res.writeHead(200, { 'Content-Type' : 'text/html'});
		res.end(data);
	});
});

// 소켓 연결
var io=socketio.listen(server);
io.sockets.on('connection', function(socket){
	// 방 참가
	socket.on('join', function(data){
		console.log(data.roomname + ' ' + data.userid);
		// join을 한다.
		socket.join(data.roomname);
		io.to(data.roomname).emit('join', 'new member : ' + data.userid);

	});

	// message
	socket.on('message', function(data){
		console.log(data.message + ' ' + data.user);
		socket.broadcast.emit('new message',{
			message: data.message,
			username: data.user
		});
	});

	socket.on('disconnect', function(){});
});