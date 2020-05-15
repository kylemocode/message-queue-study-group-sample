const express = require('express');
const bodyParser = require('body-parser');
const MessageQueueService = require('./models/messageQueue')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.send('test route');
})

app.post('/email', async (req, res) => {
	let { queueName, email } = req.body;
	const messageQueue = new MessageQueueService('amqp://localhost:5672');
	await messageQueue.connect();
	messageQueue.publishToQueue(queueName, email);
	res.status(200).send({
		"message": "email sent successfully."
	})
})

app.listen(5000, () => {
	console.log('server listening on port 5000...');
})