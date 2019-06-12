const { createServer } = require('http');

createServer((request, response) => {
	let body = '';
	request.on('data', data => body += data);
	request.on('end', () => {
		console.log('Received command.');
		const message = JSON.parse(body);
		const reply = JSON.stringify({
			action: 'SEND_MESSAGE_TO_CHANNEL',
			parameters: {
				channel_id: message.channel_id,
				message: `Hello, <@${message.author.id}>!`
			}
		});
		response.writeHead(200, { 'Content-Type': 'application/json' });
		response.end(reply);
	});
}).listen(3003, '0.0.0.0');

console.log('Server running a http://localhost:80/');
