const router = require("express").Router();
const authController = require("../controller/authController.js");
const middlewareValidationSchema = require("../middleware/middlewareValidationSchema.js");
const middlewareAuthenticate = require("../middleware/middlewareAuthenticate.js");

router
  .route("/register")
  /**
   * Forme de l'objet attendu par l'API
   * @typedef {object} registerUser
   * @property {string} firstname.required - Le prénom de l'utilisateur
   * @property {string} lastname.required - Le nom de l'utilisateur
   * @property {string} email.required - L'adresse e-mail de l'utilisateur
   * @property {string} password.required - Le password de l'utilisateur
   */
  /**
   * POST /api/auth/register
   * @summary Appelle API permettant de créer un nouvel utilisateur
   * @tags Authentification
   * @param {registerUser} request.body.required - Le nouvel utilisateur à créer
   * @return {object} 201 - Utilisateur crée
   * @return {object} 400 - Non respect des formats à envoyer
   * @return {object} 500 - Erreur lié au service d'inscription
   * @example response - 201 - Utilisateur crée
   * {
   *  "message": "Utilisateur crée"
   * }
   * @example response - 400 - Non respect des formats à envoyer
   * {
   * "instancePath": "/email",
   * "schemaPath": "#/properties/email/format",
   * "keyword": "format",
   * "params": {
   * "format": "email"
   *  },
   * "message": "must match format \"email\""
   *}
   * @example response - 500 - Erreur lié au service d'inscription
   * {
   * "codeStatus": 500,
   * "errorDescription": "Key (user_email)=(gourouvin.laurent@gmail.com) already exists."
   * }
   * */
  .post(middlewareValidationSchema("user"), authController.createUser);

router
  .route("/login")
  /**
   * Forme de l'objet attendu par l'API
   * @typedef {object} loginUser
   * @property {string} email.required - L'adresse e-mail de l'utilisateur
   * @property {string} password.required - Le password de l'utilisateur
   */
  /**
   * POST /api/auth/login
   * @tags Authentification
   * @summary Appelle API permettant de se connecter et de récupérer un token pour l'utilisateur
   * @param {loginUser} request.body.required
   * @return {object} 200 - Token généré
   * @return {object} 404 - Email ou mot de passe incorrect
   * @return {object} 400 - Non respect des formats à envoyer
   * @example response - 200 - Token généré
   * {
   *  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
   * }
   * @example response - 404 - Email ou mot de passe incorrect
   * {
   *  "message": "Email ou mot de passe incorrect."
   * }
   * @example response - 400 - Non respect des formats à envoyer
   * {
   * "instancePath": "/email",
   * "schemaPath": "#/properties/email/format",
   * "keyword": "format",
   * "params": {
   * "format": "email"
   *  },
   * "message": "must match format \"email\""
   *}
   */
  .post(middlewareValidationSchema("login"), authController.loginUser);

router
  .route("/getCurrentUser")
  /**
   * POST /api/auth/getCurrentUser
   * @tags Authentification
   * @summary Appelle API permettant récupérer les informations de l'utilisateur connecté
   * @return {object} 200 - Informations de l'utilisateur obtenues
   * @return {object} 404 - Token Invalide
   * @example response - 200 - Informations de l'utilisateur
   * {
   *  "user_firstname": "John",
   *  "user_lastname": "Doe",
   *  "user_email": "john@doe.com"
   * }
   * @example response - 404 - Email ou mot de passe incorrect
   * {
   *  "message": "Token invalide pour accéder à ces informations."
   * }
   */
  .post(middlewareAuthenticate, authController.getCurrentUser);

module.exports = router;
