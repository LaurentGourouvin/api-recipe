const config = require("../config/database.pgsql.js");
const { Client } = require("pg");

const dbClient = new Client(config);

dbClient
  .connect()
  .then(() => console.log("Connecté à la base de donnée 🚀"))
  .catch((err) =>
    console.error("Erreur de connexion à la base de donnée ❌", err.stack)
  );

module.exports = dbClient;
