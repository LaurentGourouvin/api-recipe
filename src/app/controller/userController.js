const userDatamapper = require("../model/user.js");
const path = require("path");

module.exports = {
  async getAll(_, response) {
    try {
      const allUser = await userDatamapper.getAll();
      if (allUser) {
        response.json(allUser);
      }
    } catch (error) {
      console.log(`🔴 Erreur dans ${path.basename(__filename)} 🔴`);
      console.log(error);
      response
        .status(error.httpResponseStatusCode)
        .json({ codeStatus: error.httpResponseStatusCode });
    }
  },
};
