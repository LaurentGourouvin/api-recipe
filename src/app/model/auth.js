const dbClient = require("../utils/pg_connection.js");
const ModelError = require("./ModelError");
const ErrorMessage = require("./errorMessage");

module.exports = {
  async createUser() {
    try {
      const allUser = await dbClient.query(`SELECT * FROM "rec_user";`);
      return allUser.rows;
    } catch (error) {
      const pgError = ErrorMessage.getDetailsError(error.code);
      throw new ModelError(
        pgError.classError,
        pgError.messageError,
        error.code,
        500
      );
    }
  },
};
