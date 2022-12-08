import mysql from 'mysql';
import { createPool } from 'mysql';
import { promisify } from 'util';


const pool = mysql.createPool({
    host: 'us-cdbr-east-06.cleardb.net',
    database: 'heroku_512db339e82573c',
    user: 'b619de97e9fb35',
    password: '0e94fd5b'
});




pool.getConnection((err, connection) => {
    if (err) { 
        console.log(err)
        
    }

    if (connection)  
    console.log('DB IS CONNECTED');
    connection.release();
    return;
});

pool.query = promisify(pool.query); //para convertir callbacks en promesas

export default pool;
