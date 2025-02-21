import pg from 'pg'
import env from 'dotenv'


const db = new pgClient({
    user: process.env.PROCESS_USER,
    host: process.env.PROCESS_HOST,
    database: process.env.PROCESS_DATABASE,
    password: process.env.PROCESS_PASSWORD,
    port: process.env.PROCESS_PORT
});
db.connect();
db.on('error', (err) => {
    console.log("Unexpected error on idle client");
    process.exit(-1);
});

export const query = (text, params) => db.query(text, params);