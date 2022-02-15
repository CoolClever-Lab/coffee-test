import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: 5777,
  URI: "https://hst-api.wialon.com/wialon/ajax.html",
  DB: {
    user: "sa",
    password: "ser09l",
    database: "coffee",
    server: "loldbtest.cd.local",
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