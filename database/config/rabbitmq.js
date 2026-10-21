const amqp = require("amqplib");
require("dotenv").config();

let channel;

async function connectRabbitMQ() {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL);

        channel = await connection.createChannel();

        await channel.assertQueue("auth.queue", {
            durable: true
        });

        console.log("Connected to RabbitMQ successfully!");

    } catch (error) {
        console.error("RabbitMQ connection failed:", error);
        throw error;
    }
}

async function sendMessage(message) {
    if (!channel) {
        throw new Error("RabbitMQ channel is not initialized");
    }

    channel.sendToQueue(
        "auth.queue",
        Buffer.from(JSON.stringify(message)),
        { persistent: true }
    );

    console.log("Message sent to RabbitMQ:", message);
}

module.exports = { connectRabbitMQ, sendMessage };