const { connectRabbitMQ, sendMessage } = require("../config/rabbitmq");

//enjoli trying to reconfigure this to accept arguments from the frontend o7

String username;
String email;
String password;

async function testRabbitMQ(uname,email,pword) {
    try {
        await connectRabbitMQ();

        const message = {
            type: "TEST_MESSAGE",
            username: uname,
            email: email,
            message: pword,
            timestamp: new Date().toISOString()
        };

        await sendMessage(message);

        console.log("Test message sent successfully!");
	echo json_encode($response);

    } catch (error) {
        console.error("RabbitMQ Test Failed:", error);
        process.exitCode = 1;
    }
}

testRabbitMQ();
