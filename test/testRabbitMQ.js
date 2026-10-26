const { connectRabbitMQ, sendMessage } = require("../Backend/config/rabbitmq");

async function testRabbitMQ() {
    try {
        await connectRabbitMQ();

        const message = {
            action: "login",
            username: "testuser",
            password: "password123"
        };

        await sendMessage(message);

        console.log("Test message sent successfully!");

    } catch (error) {
        console.error("RabbitMQ Test Failed:", error);
        process.exitCode = 1;
    }
}

testRabbitMQ();