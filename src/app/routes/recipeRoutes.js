const router = require("express").Router();
const recipeController = require("../controller/recipeController.js");
const middlewareValidationSchema = require("../middleware/middlewareValidationSchema.js");
const middlewareAuthenticate = require("../middleware/middlewareAuthenticate.js");

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
 * GET /api/recipe/recipeById/{idRecipe}
 * @summary Obtenir une recette via son ID
 * @tags Recipe
 * @param {number}  idRecipe.path.required - ID de la recette
 * @return {object} 200 - Récupération de la recette
 * @return {object} 204 - Aucune recette récupérée
 *  */
router.route("/recipeById/:idRecipe").get(recipeController.getOneRecipeById);
/**
 * GET /api/recipe/recipeByUserId/{userId}
 * @summary Obtenir les recettes crées par une utilisateur
 * @tags Recipe
 * @param {number}  userId.path.required - ID de l'utilisateur
 * @return {object} 200 - Récupération des recettes
 * @return {object} 204 - Aucune recette récupérée
 *  */
router
  .route("/recipeByUserId/:idUser")
  .get(recipeController.getRecipesByUserId);

/**
 * POST /api/recipe/create
 * @summary Créer une nouvelle recette
 * @tags Recipe
 * @param {string} name.request.body.required - Nom de la recette
 * @param {string} description.request.body.required - Description de la recette
 * @param {string} image - Image cover de la recette
 * @param {number} user_id.request.body.required - Id de l'utilisateur
 * @return {object} 200 - Récupération des recettes
 * @return {object} 204 - Aucune recette récupérée
 *  */
router
  .route("/create")
  .post(
    middlewareAuthenticate,
    middlewareValidationSchema("recipe"),
    recipeController.createRecipe
  );

/**
 * DELETE /api/recipe/delete
 * @summary Supprimer une recette
 * @tags Recipe
 * @param {number} idRecipe.path.required - Id de la recette à supprimer
 * @return {object} 200 - Récupération des recettes
 * @return {object} 404 - Impossible de supprimer la recette
 *  */
router
  .route("/delete")
  .delete(middlewareAuthenticate, recipeController.deleteRecipe);

/**
 * PATCH /api/recipe/update
 * @summary Mise à jour d'une recette
 * @tags Recipe
 * @param {string} name.request.body - Nom de la recette à modifier
 * @param {string} description.request.body - Description de la recette
 * @param {string} image.request.body - URI de l'image
 * @return {object} 200 - Modification d'une recette effectuée
 * @return {object} 404 - Impossible de modifier la recette
 *  */
router
  .route("/update")
  .patch(middlewareAuthenticate, recipeController.updateRecipe);
module.exports = router;
