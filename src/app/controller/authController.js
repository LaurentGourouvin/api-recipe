const authDataMapper = require("../model/auth.js");
const path = require("path");

module.exports = {
  async createUser(request, response) {
    try {
      const user = await authDataMapper.createUser(request.body);
      if (user) {
        response.status(201).json({ message: "Utilisateur crée" });
      }
    } catch (error) {
      console.log(`🔴 Erreur dans ${path.basename(__filename)} 🔴`);
      console.log(error);
      response.status(error.httpResponseStatusCode).json({
        codeStatus: error.httpResponseStatusCode,
        errorDescription: error?.detail,
      });
    }
  },
};
