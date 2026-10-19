const { connectRabbitMQ, sendMessage } = require("../Backend/config/rabbitmq");

async function testRabbitMQ() {
    try {
        await connectRabbitMQ();

        const message = {
            type: "TEST_MESSAGE",
            username: "testuser",
            email: "test@example.com",
            message: "Hello RabbitMQ!",
            timestamp: new Date().toISOString()
        };

        await sendMessage(message);

        console.log("Test message sent successfully!");

    } catch (error) {
        console.error("RabbitMQ Test Failed:", error);
        process.exitCode = 1;
    }
}

testRabbitMQ();