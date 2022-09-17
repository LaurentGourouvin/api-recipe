const router = require("express").Router();
const authController = require("../controller/authController.js");
const middlewareValidationSchema = require("../middleware/middlewareValidationSchema.js");

// Il me faut une route pour s'inscrire et une pour se connecter à mon compte

router
  .route("/register")
  /**
   * Un type User
   * @typedef {object} user
   * @property {string} firstname.required - Le prénom de l'utilisateur
   * @property {string} lastname.required - Le nom de l'utilisateur
   * @property {string} email.required - L'adresse e-mail de l'utilisateur
   * @property {string} password.required - Le password de l'utilisateur
   */
  /**
   * POST /api/auth/register
   * @summary Appelle API permettant de créer un nouvel utilisateur
   * @tags Authentification
   * @param {user} request.body.required - Le nouvel utilisateur à créer
   * */
  .post(middlewareValidationSchema("user"), authController.createUser);

//   .route("/login")
//   /**
//    * Paramètres permettant la création d'un utilisateur :
//    * @typedef {object} user
//    * @property {string} firstname - firstname
//    * @property {string} lastname - lastname
//    * @property {string} email - email
//    * @property {string} password - password
//    */
//   /**
//    * POST /api/auth/login
//    * @summary Appelle API permettant de connecter un utilisateur
//    * @tags Authentification
//    * @param {object} user - Les informations de l'utilisateur pour se connecter
//    * @param {string} user.firstname - Prénom de l'utilisateur
//    * @param {string} user.lastname - Nom de l'utilisateur
//    * @param {string} user.email - Email de l'utilisateur
//    * @param {string} user.password - Mot de passe de l'utilisateur
//    * @return {object} 200 - OK
//    * @return {object} 404 - La requête n'a pas été trouvé sur l'API
//    * */
//   .post(authController.loginUser());

module.exports = router;
