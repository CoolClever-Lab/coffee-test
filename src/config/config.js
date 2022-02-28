import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT,
  DB: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    server: process.env.DB_SERVER,
    parseJSON: true,
    pool: {
      max: 10,
      min: 1,
      idleTimeoutMillis: 30000,
    },
    options: {
      trustServerCertificate: true, // change to true for local dev / self-signed certs
    },
  },
};