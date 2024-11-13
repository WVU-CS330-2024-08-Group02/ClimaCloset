import sql from 'mssql';

// Configure connection to Azure SQL Database
const config = {
    user: "cs330admin", // Azure SQL username
    password: "cs330Pass!", // Azure SQL password
    server: "cs3302.database.windows.net", // Server name
    database: "CS330_1", // Database name
    options:
    {
        encrypt: true,
        trustServerCertificate: true
    }
};

const pool = sql.connect(config);

// Connect to the database and insert requested sign up data
pool.then(pool => {
    return pool.request()
    .input('username', sql.VARCHAR(255), "InsertionTest") //@username
    .input('email', sql.VARCHAR(255), "InsertionEmail") //@Email
    .input('password', sql.VARCHAR(255), "InsertionPassword") //@password
    .input('name', sql.VARCHAR(255), "InsertionName") //@name
    .query('INSERT INTO users (username, email, password, name) VALUES (@username, @email, @password, @name)');
}).then(result => {
    console.log('Insertion successful:', result);
  }).catch(err => {
    console.error('Error occurred:', err);
  }).finally(() => {
    sql.close();  // Close Connection
  });