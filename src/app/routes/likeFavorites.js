const router = require("express").Router();
const likeFavoritesController = require("../controller/likeFavorites.js");
const middlewareAuthenticate = require("../middleware/middlewareAuthenticate.js");

/**
 * Un likeFavorite est créee à l'aide de ces paramètres
 * @typedef {object} likeFavorites
 * @property {number} id - Id de la likeFavorite
 * @property {number} user_id - Id de l'utilisateur
 * @property {number} recipe_id - Id de la recette
 * @property {boolean} isLike - Si la recette possède un Like (true ou false)
 * @property {boolean} isFavorite - Si la recette possède un Favoris (true ou false)
 * @property {date} created_at - Date de création de l'information
 * @property {date} updated_at - Date de modification d'une valeur
 */
/**
 *  GET /api/likeFavorites/{recipeId}
 * @summary Obtenir l'information si un utilisateur possède cette recette dans ces favoris ou s'il a liké la recette
 * @tags Like and Favorite
 * @param {number} recipeId.path.required
 * @return {object} 200 - Récupération des informations concernant un like ou un favoris
 * @return {object} 204 - Aucune information récupérée.
 *  */
router
  .route("/:recipeId")
  .get(
    middlewareAuthenticate,
    likeFavoritesController.getLikeAndFavoritesFromCurrentUserAndRecipeId
  );

/**
 *  GET /api/likeFavorites/favorites/{userId}
 * @summary Obtenir les favoris d'un utilisateur
 * @tags  Favorite
 * @param {number} userId.path.required - Id de l'utilisateur
 * @return {object} 200 - Récupération de la liste des favoris
 * @return {object} 204 - L'utilisateur n'a pas encore enregistré de favoris
 */
router
  .route("/favorites/:userId")
  .get(
    middlewareAuthenticate,
    likeFavoritesController.getFavoritesRecipeByUserId
  );
/**
 *  GET /api/likeFavorites/favorites/{userId}
 * @summary Obtenir les likes d'un utilisateur
 * @tags  Favorite
 * @param {number} userId.path.required - Id de l'utilisateur
 * @return {object} 200 - Récupération de la liste des favoris
 * @return {object} 204 - L'utilisateur n'a pas encore enregistré de favoris
 */
router
  .route("/likes/:userId")
  .get(middlewareAuthenticate, likeFavoritesController.getLikesRecipeByUserId);
/**
 * POST /api/likeFavorites/
 * @summary Initalise un like et un favoris à false pour un utilisateur par rapport à une recette
 * @tags  Like and Favorite
 * @param {number} recipeId.request.body.required
 * @return {object} 200 - La création d'une relation entre l'utilisateur et la recette (like, favoris) a pas été effectuée
 * @return {object} 204 - La création d'une relation entre l'utilisateur et la recette (like, favoris) n'a pas été effectuée
 */
router
  .route("/favorites")
  .post(middlewareAuthenticate, likeFavoritesController.createLikeFavorite);

/**
 * PUT /api/likeFavorites/updateFavorite
 * @summary Modifier un favoris d'un utilisateur par rapport à une recette
 * @tags Favorite
 * @param {number} recipeId.path.required - ID de la recette
 * @return {object} 200 - Mise à jour du favoris effectuée.
 * @return {object} 404 - L'utilisateur n'a jamais consulté cette recette et n'a donc pas de favoris par défaut.
 */
router
  .route("/updateFavorite")
  .put(
    middlewareAuthenticate,
    likeFavoritesController.updateFavoritesByUserIdAndRecipeId
  );

/**
 * PUT /api/likeFavorites/updateLike
 * @summary Modifier un like d'un utilisateur par rapport à une recette
 * @tags Like
 * @param {number} recipeId.path.required - ID de la recette
 * @return {object} 200 - Mise à jour du like effectuée.
 * @return {object} 404 - L'utilisateur n'a jamais consulté cette recette et n'a donc pas de like par défaut.
 */
router
  .route("/updateLike")
  .put(
    middlewareAuthenticate,
    likeFavoritesController.updateLikeByUserIdAndRecipeId
  );

module.exports = router;
