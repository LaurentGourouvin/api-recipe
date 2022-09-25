const jwt = require("jsonwebtoken");
const dotenv = require("../utils/dotenv.js").getEnvConfig(
  __dirname,
  "../config/.env"
);

const middlewareAuthenticate = (request, response, next) => {
  const token = request.cookies.access_token;

  console.log("je passe de le middleware du token");
  if (!token) {
    return response
      .status(403)
      .json({ message: "Avez vous bien envoyé les credentials ?" });
  }

  try {
    const user = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
    request.userId = user.userId;
    request.roleId = user.roleId;
  } catch (error) {
    return response
      .status(403)
      .json({ message: "Token invalide pour accéder à ces informations." });
  }
  next();
};

module.exports = middlewareAuthenticate;
