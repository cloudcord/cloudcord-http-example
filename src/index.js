const { createServer } = require('http');

const port = 3003;
const host = '0.0.0.0';

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
}).listen(port, host);

console.log(`Server running at ${host}:${port}`);
