const dbClient = require("../utils/pg_connection.js");
const ModelError = require("./ModelError");
const ErrorMessage = require("./errorMessage");

module.exports = {
  async getAll() {
    try {
      const allRecipe = await dbClient.query(
        `SELECT  "recipe_id", "recipe_name", "recipe_description", "recipe_image", "recipe_created_at", "recipe_updated_at", "user_firstname", "user_lastname"
        FROM "rec_recipe" INNER JOIN "rec_user" ON "rec_recipe"."user_id" = "rec_user"."user_id" ;`
      );
      return allRecipe.rows;
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

  async getOneRecipeById(idRecipe) {
    try {
      const recipe = await dbClient.query(
        `SELECT "recipe_id", "recipe_name", "recipe_description", "recipe_image", "recipe_created_at", "recipe_updated_at", "user_firstname", "user_lastname" 
        FROM "rec_recipe" INNER JOIN "rec_user" ON "rec_recipe"."user_id" = "rec_user"."user_id" 
        WHERE "rec_recipe"."recipe_id" = ${idRecipe};`
      );

      return recipe.rows[0];
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

  async getRecipesByUserId(userId) {
    try {
      const recipe = await dbClient.query(
        `SELECT "recipe_id", "recipe_name", "recipe_description", "recipe_image", "recipe_created_at", "recipe_updated_at", "user_firstname", "user_lastname" 
          FROM "rec_recipe" INNER JOIN "rec_user" ON "rec_recipe"."user_id" = "rec_user"."user_id" 
          WHERE "rec_recipe"."user_id" = ${userId};`
      );

      return recipe.rows;
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
