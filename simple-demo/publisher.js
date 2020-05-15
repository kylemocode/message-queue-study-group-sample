const amqp = require('amqplib');

const msg_to_send = { number: process.argv[2] };

async function connect() {
	try {
		const connection = await amqp.connect('amqp://localhost:5672');
		const channel = await connection.createChannel();

		// 確認 queue 是否存在，若不存在則建一個
		await channel.assertQueue("backend_jobs");
		channel.sendToQueue("backend_jobs", Buffer.from(JSON.stringify(msg_to_send)));
		console.log('job 傳送成功！');
	} catch (err) {
		console.log(err);
	}
}

connect();