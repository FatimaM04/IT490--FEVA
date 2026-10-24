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
    
    await channel.assertQueue('auth.queue', {durable:true});
    await channel.assertQueue('auth.response', {durable:true});
    console.log('Listening on auth.queue');

                channel.consume('auth.queue', async (msg) => {
            if (msg !== null){
                try{
                    const data = JSON.parse(msg.content.toString());
                    console.log('Receive request:', data); 

                let response = {};

                // 1. LOGIN
                if (data.action === 'login') {
                    const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [data.username]);

                    if (rows.length > 0 && rows[0].password === data.password) {
                        const token = "token_" + Math.random().toString(36).substring(7);
                        
                        // Save the token to the database!
                        await db.execute('INSERT INTO sessions (token, username) VALUES (?, ?)', [token, data.username]);
                        
                        response = { status: 'success', token: token, message: 'Login OK' };
                    } else {
                        response = { status: 'failure', message: 'Invalid credentials' };
                    }
                } 
                // 2. REGISTER
                else if (data.action === 'register') {
                    const [existing] = await db.execute('SELECT * FROM users WHERE username = ?', [data.username]);
                    
                    if (existing.length > 0) {
                        response = { status: 'failure', message: 'User already exists' };
                    } else {
                        await db.execute('INSERT INTO users (username, password) VALUES (?, ?)', [data.username, data.password]);
                        response = { status: 'success', message: 'User registered' };
                    }
                }
                // 3. VALIDATE SESSION
                else if (data.action === 'validate_session') {
                    const [sessions] = await db.execute('SELECT * FROM sessions WHERE token = ?', [data.token]);
                    
                    if (sessions.length > 0) {
                        response = { status: 'success', message: 'Session valid' };
                    } else {
                        response = { status: 'failure', message: 'Invalid session' };
                    }
                }

                // Send the response back
                const responseString = JSON.stringify(response);
                channel.sendToQueue('auth.response', Buffer.from(responseString));
                console.log('Sent response:', responseString);
                
                    if (data.action === 'login') {
                        const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [data.username]);

                        let response = {};

                    // Check if user exists and password matches
                        if (rows.length > 0 && rows[0].password_hash === data.password) {
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
                }catch (parseErr){
                    console.error('Error processing message payload:', parseErr.message);
                } finally {
                channel.ack(msg);
                }
            }
        });
    } catch (error){
        console.error('Listener error:', error.message);
    }
}
startListener();