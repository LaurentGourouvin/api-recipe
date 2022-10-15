const router = require("express").Router();
const ingredientsController = require("../controller/ingredientsController.js");
const middlewareAuthenticate = require("../middleware/middlewareAuthenticate.js");

/**
 * Un ingrédient est créee à l'aide de ces paramètres
 * @typedef {object} ingredient
 * @property {number} id - Id de l'ingrédient
 * @property {number} name - Nom de l'ingrédient
 * @property {date} created_at - Date de création de l'information
 */
/**
 *  GET /api/ingredient
 * @summary Obtenir l'information si un utilisateur possède cette recette dans ces favoris ou s'il a liké la recette
 * @tags Like and Favorite
 * @param {number} recipeId.path.required
 * @return {object} 200 - Récupération des informations concernant un like ou un favoris
 * @return {object} 204 - Aucune information récupérée.
 *  */
router.route("/").get(ingredientsController.getAll);

/**
 *  GET /api/ingredient
 * @summary Obtenir les ingédients d'une recette
 * @tags Like and Favorite
 * @param {number} recipeId.path.required
 * @return {object} 200 - Récupération des informations concernant un like ou un favoris
 * @return {object} 204 - Aucune information récupérée.
 *  */
router.route("/:idRecipe").get(ingredientsController.getIngredientByRecipeId);

module.exports = router;
