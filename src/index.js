import express from "express";

import router from "./routes/index.route.js";
import config from "./config/config.js";

const { PORT } = config;

const app = express();

app.use(express.json());

app.use("/", router);

app.listen(PORT, () => {
  console.log(`start on ${PORT}`);
});