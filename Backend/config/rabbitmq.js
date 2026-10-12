
let channel;

async function connectRabbitMQ() {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue("auth_queue", { durable: true });
}

async function sendMessage(message) {
    await channel.sendToQueue("auth_queue", Buffer.from(JSON.stringify(message)));
}

module.exports = { connectRabbitMQ, sendMessage };