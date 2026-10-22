const amqp = require('amqplib');
const mysql = require('mysql2/promise');

async function startListener() {
    try {
    const db = await mysql.createConnection({
        host : 'localhost',
        user : 'db_user',
        password:'Dbpassword123!',
        database: 'auth_db'
    });
    console.log('Connected to the MYSQL');
    
    const conn = await amqp.connect('amqp://fnm:1234@10.214.17.73:5672/');
    const channel = await conn.createChannel();
    await channel.assertQueue('db_queue');

    console.log('Listening on db_queue');

    channel.consume('db_queue', async (msg) => {
        if (msg !== null){
        const data = JSON.parse(msg.content.toString());
        console.log('Receive request:', data); }


        const [rows] = await db.execute('SELECT * FROM users WHERE username =?', [data.username]);

        if (msg.properties.replyTo){
            channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(rows)), 
            {correlationId: msg.properties.correlationId}
        );

        }
        channel.ack(msg);

    });
} catch (error){
    console.error('Listener error:', error.message);
}
}
startListener();



