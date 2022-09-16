// Initialize .Env
const path = require("path");
const dotenv = require("../utils/dotenv.js").getEnvConfig(
  __dirname,
  "../config/.env"
);

// Initialize global config
const express = require("express");
const server = express();
const globalRouter = require("../router/router.js");
const morgan = require("morgan");

// Initialize Swagger
const expressJsDocSwagger = require("express-jsdoc-swagger");
const configSwagger = require("../config/config.swagger.js");

expressJsDocSwagger(server)(configSwagger);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan("tiny"));
server.use(globalRouter);

server.listen(process.env.SERVER_PORT, () => {
  console.log("Serveur lancé ✔ ");
  console.log(
    `API disponible via 🔗 http://localhost:${process.env.SERVER_PORT}`
  );
  console.log(
    `Documentation disponible via 🔗 http://localhost:${process.env.SERVER_PORT}${process.env.API_DOCS_PATH}`
  );
});

module.exports = server;
