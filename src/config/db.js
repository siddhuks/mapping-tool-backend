const sql = require("mssql");

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

let poolPromise;

try {
    poolPromise = new sql.ConnectionPool(dbConfig)
        .connect()
        .then((pool) => {
            console.log('Connected to Azure SQL Database');
            return pool;
        });
} catch (err) {
    console.error('Database Connection Failed:', err.message);
}

module.exports = {
    sql,
    poolPromise,
};