const sql = require("mssql");

const dbConfig = {
    user: process.env.DB_USER || 'default_user',
    password: process.env.DB_PASSWORD || 'default_password',
    server: process.env.DB_SERVER || 'localhost',
    database: process.env.DB_NAME || 'default_db',
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
            console.log("Connected to Azure SQL Database");
            return pool;
        })
        .catch((err) => {
            console.error("Database Connection Failed:", err.message);
            process.exit(1);
        });
} catch (err) {
    console.error("Database Initialization Error:", err.message);
    process.exit(1);
}

module.exports = {
    sql,
    poolPromise,
};