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

      const { user_id: userId, role_id: roleId } = user.data[0];

      const token = jwt.sign(
        { userId, roleId },
        process.env.SECRET_ACCESS_TOKEN,
        {
          expiresIn: "4h",
          algorithm: "HS256",
        }
      );

      response
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({ token: token });
    } catch (error) {
      console.log(`🔴 Erreur dans ${path.basename(__filename)} 🔴`);
      console.log(error);
      response.status(error.httpResponseStatusCode).json({
        codeStatus: error.httpResponseStatusCode,
        errorDescription: error?.detail,
      });
    }
  },

  async getCurrentUser(request, response) {
    try {
      const user = await authDataMapper.getCurrentUser({
        id: request.userId,
      });
      if (user) {
        response.status(200).json(user);
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
