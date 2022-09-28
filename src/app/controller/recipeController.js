const recipeDatamapper = require("../model/recipe.js");
const path = require("path");

module.exports = {
  async getAll(_, response) {
    try {
      const allRecipe = await recipeDatamapper.getAll();
      if (allRecipe) {
        response.json(allRecipe);
      }
    } catch (error) {
      console.log(`🔴 Erreur dans ${path.basename(__filename)} 🔴`);
      console.log(error);
      response.status(error.httpResponseStatusCode).json({
        codeStatus: error.httpResponseStatusCode,
        errorDescription: error?.detail,
      });
    }
  },

  async getOneRecipeById(request, response) {
    const idRecipe = Number(request.params.idRecipe);
    try {
      const recipe = await recipeDatamapper.getOneRecipeById(idRecipe);
      if (!recipe) {
        return response
          .status(204)
          .json({ message: "Aucune recette trouvé avec cet id" });
      }
      response.json(recipe);
    } catch (error) {
      console.log(`🔴 Erreur dans ${path.basename(__filename)} 🔴`);
      console.log(error);
      response.status(error.httpResponseStatusCode).json({
        codeStatus: error.httpResponseStatusCode,
        errorDescription: error?.detail,
      });
    }
  },

  async getRecipesByUserId(request, response) {
    const idUser = Number(request.params.idUser);
    try {
      const recipe = await recipeDatamapper.getRecipesByUserId(idUser);

      if (!recipe || recipe.length === 0) {
        return response
          .status(204)
          .json({ message: "Aucune recette lié à cet utilisateur" });
      }
      response.status(200).json(recipe);
    } catch (error) {
      console.log(`🔴 Erreur dans ${path.basename(__filename)} 🔴`);
      console.log(error);
      response.status(error.httpResponseStatusCode).json({
        codeStatus: error.httpResponseStatusCode,
        errorDescription: error?.detail,
      });
    }
  },

  async createRecipe(request, response) {
    const { name, description } = request.body;
    const userId = request.userId;
    try {
      const recipe = await recipeDatamapper.createRecipe(
        name,
        description,
        userId
      );
      if (!recipe) {
        return response.status(404).json({ message: "Recette non créee." });
      }
      response.status(201).json(recipe);
    } catch (error) {
      console.log(`🔴 Erreur dans ${path.basename(__filename)} 🔴`);
      console.log(error);
      response.status(error.httpResponseStatusCode).json({
        codeStatus: error.httpResponseStatusCode,
        errorDescription: error?.detail,
      });
    }
  },

  async deleteRecipe(request, response) {
    const { recipeId } = request.body;
    const userId = request.userId;

    try {
      const deleteRecipe = await recipeDatamapper.deleteRecipe(
        recipeId,
        userId
      );

      if (!deleteRecipe || deleteRecipe.length === 0) {
        return response.status(404).json({ message: "Recette non supprimée." });
      }
      response.status(204).json(deleteRecipe);
    } catch (error) {
      console.log(`🔴 Erreur dans ${path.basename(__filename)} 🔴`);
      console.log(error);
      response.status(error.httpResponseStatusCode).json({
        codeStatus: error.httpResponseStatusCode,
        errorDescription: error?.detail,
      });
    }
  },

  async updateRecipe(request, response, next) {
    const { recipeId } = request.body;
    const userId = request.userId;
    const recipe = {
      name: request.body.name,
      description: request.body.description,
    };

    try {
      const updateRecipe = await recipeDatamapper.updateRecipe(
        userId,
        recipeId,
        recipe
      );

      if (!updateRecipe) {
        return response.status(404).json({ message: "Recette non modifiée" });
      }

      response.status(200).json(recipe);
    } catch (error) {
      console.log(`🔴 Erreur dans ${path.basename(__filename)} 🔴`);
      console.log(error);
      response.status(error.httpResponseStatusCode).json({
        codeStatus: error.httpResponseStatusCode,
        errorDescription: error?.detail,
      });
    }
  },

  async uploadImageTest(request, response) {
    try {
      console.log(request.body);
      console.log(request.file);

      response.status(200).json({ message: "test" });
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
