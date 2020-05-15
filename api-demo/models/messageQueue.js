const amqp = require('amqplib');

class MessageQueueService {
	constructor(CONN_URL) {
		this.connection_url = CONN_URL;
	}

	async connect() {
		const connection = await amqp.connect(this.connection_url);
		this.channel = await connection.createChannel();
	}

	async publishToQueue(queueName, data) {
		await this.channel.assertQueue(queueName);
		this.channel.sendToQueue(queueName, Buffer.from(data));
	}

	closeChannel() {
		this.channel.close();
		console.log(`Closing rabbitmq channel`);
	}
}

module.exports = MessageQueueService;