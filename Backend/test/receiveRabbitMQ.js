
const amqp = require("amqplib");
require("dotenv").config();

const QUEUE_NAME = "auth_queue";

async function receiveRabbotMQ() {
    try {
        // Connect to RabbitMQ
        const connection = await amqp.connect(
            process.env.RABBITMQ_URL
        );

        console.log("Connected to RabbitMQ successfully!");

        // Create channel
        const channel = await connection.createChannel();

        // Make sure queue exists
        await channel.assertQueue(QUEUE_NAME, {
            durable: true
        });

        console.log(`Waiting for messages in ${QUEUE_NAME}...`);

        // Receive messages
        channel.consume(
            QUEUE_NAME,
            (msg) => {
                if (msg !== null) {
                    try {
                        // Convert message from Buffer to JSON
                        const message = JSON.parse(
                            msg.content.toString()
                        );

                        console.log("\n========== MESSAGE RECEIVED ==========");
                        console.log("Queue:", QUEUE_NAME);
                        console.log("Message:", message);
                        console.log("Timestamp:", new Date().toISOString());
                        console.log("======================================\n");

                        // Acknowledge message
                        channel.ack(msg);

                        console.log("Message acknowledged successfully!");
                    } catch (error) {
                        console.error("Error processing message:", error);

                        // Reject malformed message without requeueing
                        channel.nack(msg, false, false);
                    }
                }
            },
            {
                noAck: false
            }
        );

    } catch (error) {
        console.error("RabbitMQ Consumer Error:", error);
        process.exitCode = 1;
    }
}

receiveRabbotMQ();