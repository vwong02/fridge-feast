const dotenv = require('dotenv');
const { Pool } = require('pg');
dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

const spoonacularApiKey = process.env.SPOONACULAR_API_KEY;

const debugMode = process.env.DEBUG === 'true';

// Use dbConfig, apiKey, and debugMode in your application
const dbPool = new Pool(dbConfig);
dbPool.connect();

module.exports = { dbPool, spoonacularApiKey };