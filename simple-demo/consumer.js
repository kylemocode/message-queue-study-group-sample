const amqp = require('amqplib');

async function connect() {
	try {
		const connection = await amqp.connect('amqp://localhost:5672');
		const channel = await connection.createChannel();
		await channel.assertQueue("jobs");

		channel.consume("backend_jobs", message => {
			const content = JSON.parse(message.content.toString());
			console.log('Recieved job message: ', content.number)

			// 確認接收並 dequeue
			channel.ack(message);

		})

		// 希望 consumer 可以一直運行著
		console.log("I am waiting for jobs to do....")
	} catch (err) {
		console.log(err);
	}
}

connect();