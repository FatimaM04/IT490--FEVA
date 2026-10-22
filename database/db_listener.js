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
    
    const conn = await amqp.connect('amqp://localhost');
    const channel = await conn.createChannel();
    await channel.assertQueue('db_queue');

    console.log('Listening on db_queue');

        channel.consume('auth.queue', async (msg) => {
            if (msg !== null){
                const data = JSON.parse(msg.content.toString());
                console.log('Receive request:', data); 

                if (data.action === 'login') {
                    const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [data.username]);

                    let response = {};

                    // Check if user exists and password matches
                    if (rows.length > 0 && rows[0].password === data.password) {
                        const token = "token_" + Math.random().toString(36).substring(7);
                        response = { status: 'success', token: token, message: 'Login OK' };
                    } else {
                        response = { status: 'failure', message: 'Invalid credentials' };
                    }

                    const responseString = JSON.stringify(response);
                    
                    // Send response to 'auth.response'
                    channel.sendToQueue('auth.response', Buffer.from(responseString));
                    
                    // Added this print statement so we can see exactly what is sent back
                    console.log('Sent response:', responseString);
                }
                
                channel.ack(msg);
            }
        });
    } catch (error){
        console.error('Listener error:', error.message);
    }
}
startListener();