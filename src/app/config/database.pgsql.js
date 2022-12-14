const dotenv = require("../utils/dotenv.js").getEnvConfig(__dirname, "./.env");

const configPg = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
};

module.exports = configPg;
