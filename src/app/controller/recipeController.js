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
};
