const router = require("express").Router();
const userController = require("../controller/userController.js");

/**
 * GET /api/user
 * @summary Obtenir la liste de tout les utilisateurs
 * @tags User
 * @return {object} 200 - Récupération de la liste de tout les utilisateurs
 * @return {object} 204 - Aucun utilisateur récupéré
 *  */
router.route("/").get(userController.getAll);

module.exports = router;
