const authDataMapper = require("../model/auth.js");
const path = require("path");
const jwt = require("jsonwebtoken");
const dotenv = require("../utils/dotenv.js").getEnvConfig(
  __dirname,
  "../config/.env"
);

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

  async loginUser(request, response) {
    try {
      const user = await authDataMapper.loginUser(request.body);

      if (user.rowCount === 0) {
        return response
          .status(404)
          .json({ message: "Email ou mot de passe incorrect." });
      }

      const token = jwt.sign(user.data[0], process.env.SECRET_TOKEN, {
        expiresIn: "1h",
        algorithm: "HS256",
      });

      response.status(200).json({ token: token });
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
