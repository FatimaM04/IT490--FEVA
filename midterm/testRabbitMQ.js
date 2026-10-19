const { connectRabbitMQ, sendMessage } = require("../config/rabbitmq");

async function testRabbitMQ(username,email) {
    try {
        await connectRabbitMQ();

        const message = {
            type: "TEST_MESSAGE",
            username: username,
            email: email,
            message: "Trying to login",
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
