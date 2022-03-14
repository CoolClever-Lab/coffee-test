import express from "express";
import swaggerUi from "swagger-ui-express";

import router from "./src/routes/index.route.js";
import config from "./src/config/config.js";
import { swaggerDocument } from "./src/swagger/swagger.js";

const { PORT } = config;

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", router);

app.listen(PORT, () => {
  console.log(`start on ${PORT}`);
});
