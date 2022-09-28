const dbClient = require("../utils/pg_connection.js");
const ModelError = require("./ModelError");
const ErrorMessage = require("./errorMessage");

module.exports = {
  // Créer une ligne dans la base de donnée
  // Pour permettre une relation existante entre la recette et un utilisateur
  async createLikeFavorite(recipeId, userId) {
    const queryCreateLikeFavorite = {
      text: `INSERT INTO "rec_recipe_has_like_favorites" ("recipe_id", "user_id") VALUES ($1, $2)
        RETURNING "recipe_id", "user_id", "like_favorites_isFavorite", "like_favorites_isLike" ;`,
      values: [recipeId, userId],
    };

    try {
      const createLikeFavorite = await dbClient.query(queryCreateLikeFavorite);
      return createLikeFavorite.rows[0];
    } catch (error) {
      const pgError = ErrorMessage.getDetailsError(error.code);
      throw new ModelError(
        pgError.classError,
        pgError.messageError,
        error.code,
        500
      );
    }
  },

  async getLikeAndFavoritesFromCurrentUserAndRecipeId(recipeId, userId) {
    const queryLikeFavorites = {
      text: `SELECT "rec_recipe_has_like_favorites"."like_favorites_isFavorite", "rec_recipe_has_like_favorites"."like_favorites_isLike"
        FROM "rec_recipe_has_like_favorites"
        WHERE "rec_recipe_has_like_favorites"."recipe_id" = $1 AND "rec_recipe_has_like_favorites"."user_id" = $2;`,
      values: [recipeId, userId],
    };

    try {
      const likeFavorites = await dbClient.query(queryLikeFavorites);
      return likeFavorites.rows[0];
    } catch (error) {
      const pgError = ErrorMessage.getDetailsError(error.code);
      throw new ModelError(
        pgError.classError,
        pgError.messageError,
        error.code,
        500
      );
    }
  },

  // Récupère les favoris d'un utilisateur
  async getFavoritesRecipeByUserId(userId) {
    const queryFavoritesRecipe = {
      text: `SELECT "rec_recipe"."recipe_id", "rec_recipe"."recipe_title" FROM "rec_recipe_has_like_favorites"
      INNER JOIN "rec_recipe" ON "rec_recipe"."recipe_id" = "rec_recipe_has_like_favorites"."recipe_id"
        WHERE "rec_recipe_has_like_favorites"."user_id" = $1 AND "rec_recipe_has_like_favorites"."like_favorites_isFavorite" = true;`,
      values: [userId],
    };

    try {
      const favoritesRecipe = await dbClient.query(queryFavoritesRecipe);
      return favoritesRecipe.rows;
    } catch (error) {
      console.log(error);
      const pgError = ErrorMessage.getDetailsError(error.code);
      throw new ModelError(
        pgError.classError,
        pgError.messageError,
        error.code,
        500
      );
    }
  },

  async updateFavoritesByUserIdAndRecipeId(isFavorite, recipeId, userId) {
    const queryUpdateFavorite = {
      text: `UPDATE "rec_recipe_has_like_favorites"
                  SET "like_favorites_isFavorite" = $1
                  WHERE "rec_recipe_has_like_favorites"."user_id" = $2 AND "rec_recipe_has_like_favorites"."recipe_id" = $3
                  RETURNING "rec_recipe_has_like_favorites"."like_favorites_isFavorite";`,
      values: [isFavorite, userId, recipeId],
    };
    try {
      const updateFavorite = await dbClient.query(queryUpdateFavorite);
      return updateFavorite.rows[0];
    } catch (error) {
      console.log(error);
      const pgError = ErrorMessage.getDetailsError(error.code);
      throw new ModelError(
        pgError.classError,
        pgError.messageError,
        error.code,
        500
      );
    }
  },

  async updateLikeByUserIdAndRecipeId(isLike, recipeId, userId) {
    const queryUpdateFavorite = {
      text: `UPDATE "rec_recipe_has_like_favorites"
                    SET "like_favorites_isLike" = $1
                    WHERE "rec_recipe_has_like_favorites"."user_id" = $2 AND "rec_recipe_has_like_favorites"."recipe_id" = $3
                    RETURNING "rec_recipe_has_like_favorites"."like_favorites_isLike";`,
      values: [isLike, userId, recipeId],
    };
    try {
      const updateLike = await dbClient.query(queryUpdateFavorite);
      return updateLike.rows[0];
    } catch (error) {
      const pgError = ErrorMessage.getDetailsError(error.code);
      throw new ModelError(
        pgError.classError,
        pgError.messageError,
        error.code,
        500
      );
    }
  },
};
