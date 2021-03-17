const dotenv = require('dotenv');
const {Pool} = require('pg');
// var fs = require('fs');

dotenv.config();

const pool =new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false,
        ca: process.env.DB_CA,
//         ca: fs.readFileSync(__dirname +'/ca-certificate.crt'),
    }
});

module.exports = {
    pool,
    // query: async (text, params) => await pool.query("select * from users")
}
