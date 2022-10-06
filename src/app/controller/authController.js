const authDataMapper = require("../model/auth.js");
const path = require("path");
const jwt = require("jsonwebtoken");
const dotenv = require("../utils/dotenv.js").getEnvConfig(
  __dirname,
  "../config/.env"
);
const bcrypt = require("bcrypt");

module.exports = {
  async createUser(request, response) {
    try {
      const newUser = request.body;
      const hashPassword = bcrypt.hashSync(newUser.password, 10);
      newUser.password = hashPassword;

      const user = await authDataMapper.createUser(newUser);
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
    console.log("Route LoginUser");
    try {
      const user = await authDataMapper.loginUser(request.body);
      console.log(user);
      if (
        user.rowCount === 0 ||
        !bcrypt.compareSync(request.body.password, user.data[0].user_password)
      ) {
        return response
          .status(404)
          .json({ message: "Email ou mot de passe incorrect." });
      }

      // je récupère l'user id et le role pour le mettre dans le token
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
      user.token = request.cookies.access_token;
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

  async logout(request, response) {
    try {
      response.clearCookie("access_token");
      response.status(200).json({ message: "Déconnexion réussie" });
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
