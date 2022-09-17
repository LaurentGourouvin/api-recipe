const dbClient = require("../utils/pg_connection.js");
const ModelError = require("./ModelError");
const ErrorMessage = require("./errorMessage");

module.exports = {
  async createUser(user) {
    // Mettre en place la partie chiffrement du mot de passe de l'utilisateur le plus rapidement possible
    const queryCreateUser = {
      text: `INSERT INTO "rec_user"("user_firstname", "user_lastname", "user_email","user_password") VALUES($1,$2,$3,$4) returning *;`,
      values: [
        `${user.firstname}`,
        `${user.lastname}`,
        `${user.email}`,
        `${user.password}`,
      ],
    };
    try {
      const resultCreateUser = await dbClient.query(queryCreateUser);
      console.log(resultCreateUser);
      return resultCreateUser.rows;
    } catch (error) {
      console.log(error);
      const pgError = ErrorMessage.getDetailsError(error.code);
      throw new ModelError(
        pgError.classError,
        pgError.messageError,
        error.code,
        500,
        error.detail
      );
    }
  },
  async loginUser(user) {
    const queryLoginUser = {
      text: `SELECT * FROM "rec_user" WHERE user_email = $1 AND user_password = $2`,
      values: [`${user.email}`, `${user.password}`],
    };
    try {
      const resultLoginUser = await dbClient.query(queryLoginUser);
      return { rowCount: resultLoginUser.rowCount, data: resultLoginUser.rows };
    } catch (error) {
      console.log(error);
      const pgError = ErrorMessage.getDetailsError(error.code);
      throw new ModelError(
        pgError.classError,
        pgError.messageError,
        error.code,
        500,
        error.detail
      );
    }
  },
};
