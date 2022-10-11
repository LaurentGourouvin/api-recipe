const dbClient = require("../utils/pg_connection.js");
const ModelError = require("./ModelError");
const ErrorMessage = require("./errorMessage");

module.exports = {
  async createUser(user) {
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
      text: `SELECT * FROM "rec_user" WHERE user_email = $1;`,
      values: [`${user.email}`],
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
  async getCurrentUser(user) {
    const queryGetCurrentUser = {
      text: `SELECT "user_id","user_firstname","user_lastname", "user_email" FROM "rec_user" WHERE user_id = $1`,
      values: [user.id],
    };
    try {
      const resultCurrentUser = await dbClient.query(queryGetCurrentUser);
      return resultCurrentUser.rows[0];
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
  async updateUser(user, id) {
    const queryUpdateUser = {
      text: `UPDATE "rec_user" SET "user_firstname" = $1, "user_lastname" = $2, "user_email" = $3 WHERE "user_id" = ${id} 
      RETURNING "user_firstname", "user_lastname", "user_email";`,
      values: [`${user.firstname}`, `${user.lastname}`, `${user.email}`],
    };
    try {
      console.log("REQ SQL A EXEC", queryUpdateUser);
      const resultUpdate = await dbClient.query(queryUpdateUser);
      return resultUpdate.rows[0];
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
