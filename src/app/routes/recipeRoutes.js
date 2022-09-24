const router = require("express").Router();
const recipeController = require("../controller/recipeController.js");

/**
 * Une recette est créee à l'aide de ces paramètres
 * @typedef {object} recipe
 * @property {number} id - Id de la recette
 * @property {string} name - Nom de la recette
 * @property {string} description - Description de la recette
 * @property {string} image - URI de l'image
 * @property {date} created_at - Date de création de la recette
 * @property {date} updated_at - Date de modification de la recette
 * @property {number} user_id - L'id de l'utilisateur qui a crée la recette
 */
/**
 * GET /api/recipe
 * @summary Obtenir la liste de tout les utilisateurs
 * @tags Recipe
 * @return {object} 200 - Récupération de la liste de toutes les recettes
 * @return {object} 204 - Aucune recette récupérée
 *  */
router.route("/").get(recipeController.getAll);

/**
 * GET /api/recipe/id/{idRecipe}
 * @summary Obtenir une recette via son ID
 * @tags Recipe
 * @param {number}  idRecipe.path.required - ID de la recette
 * @return {object} 200 - Récupération de la recette
 * @return {object} 204 - Aucune recette récupérée
 *  */
router.route("/id/:idRecipe").get(recipeController.getOneRecipeById);
/**
 * GET /api/recipe/userid/{userId}
 * @summary Obtenir les recettes crées par une utilisateur
 * @tags Recipe
 * @param {number}  userId.path.required - ID de l'utilisateur
 * @return {object} 200 - Récupération des recettes
 * @return {object} 204 - Aucune recette récupérée
 *  */
router.route("/userid/:idUser").get(recipeController.getRecipesByUserId);

module.exports = router;
