const ingredientsModel = require("../model/ingredients.js");
const path = require("path");
const jwt = require("jsonwebtoken");
const dotenv = require("../utils/dotenv.js").getEnvConfig(
  __dirname,
  "../config/.env"
);

module.exports = {
  async getAll(request, response) {
    try {
      const resultGetAllIngredient = await ingredientsModel.getAll(
        request.body,
        request.userId
      );

      if (!resultGetAllIngredient)
        return response.status(200).json({ message: "Aucun ingrédient !" });

      return response.status(200).json(resultGetAllIngredient);
    } catch (error) {
      console.log(`🔴 Erreur dans ${path.basename(__filename)} 🔴`);
      console.log(error);
      response.status(error.httpResponseStatusCode).json({
        codeStatus: error.httpResponseStatusCode,
        errorDescription: error?.detail,
      });
    }
  },
  async getIngredientByRecipeId(request, response) {
    const idRecipe = Number(request.params.idRecipe);
    try {
      const resultGetIngredients =
        await ingredientsModel.getIngredientByRecipeId(idRecipe);

      if (!resultGetIngredients)
        return response.status(200).json({ message: "Aucun ingrédient !" });

      return response.status(200).json(resultGetIngredients);
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
