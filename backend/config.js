/**
 * This file exports the database configutation for Azure SQL and the connectDB
 * function, which establishes the connection. It uses enviorment variables for
 * sensitive data
 */

const test = require('dotenv').config();
console.log(test);
console.log(process.env.DB_USER);
console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_DATABASE);
console.log(process.env.DB_SERVER);
const sql = require('mssql');

// Database configuration object using enviorment variables for security
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
      encrypt: true, // Enables encryption for Azure SQL
      enableArithAbort: true,
    },
  };
  
  /**
   * Establishes a connection to the Azure SQL database.
   * Logs a success or error message depending on the connection status.
   */
  const connectDB = async () => {
    try {
      await sql.connect(dbConfig);
      console.log("Connected to Azure SQL Database");
    } catch (error) {
      console.error("Database connection failed:", error);
    }
  };
  
  module.exports = { sql, connectDB };