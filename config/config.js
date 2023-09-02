//Lee atomaticamente el archivo .env y carga los datos en estas variables de NODE.
require('dotenv').config();


const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.NODE_PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  passEmail: process.env.PASS_EMAIL,
  emailNodeMail: process.env.USER_NODEMAIL
}

module.exports = { config };
