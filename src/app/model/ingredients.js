const dbClient = require("../utils/pg_connection.js");
const ModelError = require("./ModelError");
const ErrorMessage = require("./errorMessage");

module.exports = {
  async getAll() {
    const queryGetAllIngredients = {
      text: "SELECT * FROM rec_ingredient",
      values: "",
    };
    try {
      console.log("REQ SQL A EXEC", queryGetAllIngredients);
      const resultUpdate = await dbClient.query(queryGetAllIngredients);
      return resultUpdate.rows;
    } catch (error) {
      console.log(error);
      const pgError = ErrorMessage.getDetailsError(error.code);
      throw new ModelError(
        pgError.classError,
        pgError.messageError,
        error.code,
        500,
        error.detail
      );
    }
  },

  async addIngredientToRecipe(idRecipe, ingredientsList) {
    console.log(ingredientsList);
    const queryAddIngredients = {
      text: `INSERT INTO "rec_recipe_has_ingredient" ("recipe_has_ingredient_quantity", "recipe_has_ingredient_unit", "recipe_id","ingredient_id")
      VALUES ($1,$2,$3,$4) returning *`,
      values: [
        `${ingredientsList.quantity}`,
        `${ingredientsList.unit}`,
        `${idRecipe}`,
        `${ingredientsList.id}`,
      ],
    };
    try {
      const resultAddIngredients = await dbClient.query(queryAddIngredients);
      return resultAddIngredients.rows[0];
    } catch (error) {
      console.log(error);
      const pgError = ErrorMessage.getDetailsError(error.code);
      throw new ModelError(
        pgError.classError,
        pgError.messageError,
        error.code,
        500,
        error.detail
      );
    }
  },
};
