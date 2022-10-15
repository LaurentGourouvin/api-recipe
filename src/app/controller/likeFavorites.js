const likeFavoritesDatamapper = require("../model/likeFavorites.js");
const path = require("path");
const {
  updateFavoritesByUserIdAndRecipeId,
} = require("../model/likeFavorites.js");

module.exports = {
  async createLikeFavorite(request, response) {
    const { recipeId } = request.body;
    const userId = request.userId;
    console.log("Je suis dans createLikeFavorite");
    console.log(request.body);
    try {
      const createLikeFavorite =
        await likeFavoritesDatamapper.createLikeFavorite(recipeId, userId);

      if (!createLikeFavorite || createLikeFavorite.length === 0) {
        return response.status(204).json({
          message:
            "La création d'une relation entre l'utilisateur et la recette (like, favoris) n'a pas été effectuée",
        });
      }

      return response.status(201).json(createLikeFavorite);
    } catch (error) {
      console.log(`🔴 Erreur dans ${path.basename(__filename)} 🔴`);
      console.log(error);
      response.status(error.httpResponseStatusCode).json({
        codeStatus: error.httpResponseStatusCode,
        errorDescription: error?.detail,
      });
    }
  },

  async getLikeAndFavoritesFromCurrentUserAndRecipeId(request, response) {
    //const { recipeId } = request.body;
    const recipeId = Number(request.params.recipeId);
    const userId = request.userId;
    console.log("controller like favoris");
    try {
      const likeFavoritesUserForThisRecipe =
        await likeFavoritesDatamapper.getLikeAndFavoritesFromCurrentUserAndRecipeId(
          recipeId,
          userId
        );

      if (
        !likeFavoritesUserForThisRecipe ||
        likeFavoritesUserForThisRecipe.length === 0
      ) {
        return response.status(204).json({
          message:
            "Pas de donnée concernant les likes et favoris pour cette utilisateur par rapport à cette recette.",
        });
      }

      return response.status(200).json(likeFavoritesUserForThisRecipe);
    } catch (error) {
      console.log(`🔴 Erreur dans ${path.basename(__filename)} 🔴`);
      console.log(error);
      response.status(error.httpResponseStatusCode).json({
        codeStatus: error.httpResponseStatusCode,
        errorDescription: error?.detail,
      });
    }
  },

  async getFavoritesRecipeByUserId(request, response) {
    // const userId = request.userId;
    const userId = Number(request.params.userId);

    try {
      const favoritesRecipes =
        await likeFavoritesDatamapper.getFavoritesRecipeByUserId(userId);
      if (!favoritesRecipes || favoritesRecipes.length === 0) {
        return response
          .status(204)
          .json({ message: "L'utilisateur n'as pas de recette en favoris." });
      }

      return response.status(200).json(favoritesRecipes);
    } catch (error) {
      console.log(`🔴 Erreur dans ${path.basename(__filename)} 🔴`);
      console.log(error);
      response.status(error.httpResponseStatusCode).json({
        codeStatus: error.httpResponseStatusCode,
        errorDescription: error?.detail,
      });
    }
  },

  async updateFavoritesByUserIdAndRecipeId(request, response) {
    const { recipeId, isFavorite } = request.body;
    const userId = request.userId;

    try {
      const updateFavorite =
        await likeFavoritesDatamapper.updateFavoritesByUserIdAndRecipeId(
          isFavorite,
          recipeId,
          userId
        );

      if (!updateFavorite) {
        return response.status(404).json({
          message:
            "L'utilisateur n'a jamais consulté cette recette et n'a donc pas de favoris par défaut.",
        });
      }

      return response.status(200).json(updateFavorite);
    } catch (error) {
      console.log(`🔴 Erreur dans ${path.basename(__filename)} 🔴`);
      console.log(error);
      response.status(error.httpResponseStatusCode).json({
        codeStatus: error.httpResponseStatusCode,
        errorDescription: error?.detail,
      });
    }
  },

  async updateLikeByUserIdAndRecipeId(request, response) {
    const { recipeId, isLike } = request.body;
    const userId = request.userId;

    try {
      const updateLike =
        await likeFavoritesDatamapper.updateLikeByUserIdAndRecipeId(
          isLike,
          recipeId,
          userId
        );

      if (!updateLike) {
        return response.status(404).json({
          message:
            "L'utilisateur n'a jamais consulté cette recette et n'a donc pas de like par défaut.",
        });
      }

      return response.status(200).json(updateLike);
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
