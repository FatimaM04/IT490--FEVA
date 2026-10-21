const mysql = require('mysql2/promise');

async function logHealthCheck(){
    const conn= await mysql.createConnection({
        host: '127.0.0.1', user: 'db_user', password: 'Dbpassword123!', database: 'auth_db'
    });
    await conn.execute("INSERT INTO system_logs (event_type) VALUES ('cron_heath_check')");
    await conn.end();

}
logHealthCheck();