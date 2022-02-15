import sql from "mssql";

import config from "./config.js";

const poolCon = new sql.ConnectionPool(config.DB)
  .connect()
  .then((conn) => {
    // console.log(conn);
    console.log('к базе подключены');
    return conn;
  })
  .catch((err) => console.log("error connection", err));

export default async function Execute(query) {
  try {
    const pool = await poolCon;
    const result = await pool.request().query(query);
    return result.recordset;
  } catch (error) {
    throw error;
  }
}