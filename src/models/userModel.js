const { poolPromise, sql } = require('../config/db');

const getUserByUsername = async(username) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('username', sql.NVarChar, username)
        .query('SELECT * FROM dbo.Users WHERE username = @username');
    return result.recordset[0];
};

const createUser = async(username, hashedPassword) => {
    const pool = await poolPromise;
    await pool.request()
        .input('username', sql.NVarChar, username)
        .input('password', sql.NVarChar, hashedPassword)
        .query('INSERT INTO dbo.Users (username, password) VALUES (@username, @password)');
};

module.exports = {
    createUser,
    getUserByUsername,
};