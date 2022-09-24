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

  async createRecipe(name, description, userId) {
    const createQuery = {
      text: `INSERT INTO "rec_recipe" ("recipe_name","recipe_description", "user_id") VALUES ($1, $2, $3) RETURNING "recipe_id", "recipe_name", "recipe_description" ;`,
      values: [`${name}`, `${description}`, `${userId}`],
    };
    try {
      const recipe = await dbClient.query(createQuery);
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

  async deleteRecipe(recipeId, userId) {
    const deleteQuery = {
      text: `DELETE FROM "rec_recipe" WHERE "rec_recipe"."recipe_id" = $1 AND "rec_recipe"."user_id" = $2 RETURNING *`,
      values: [recipeId, userId],
    };

    try {
      const deleteRecipe = await dbClient.query(deleteQuery);
      return deleteRecipe.rows;
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

  async updateRecipe(userId, recipeId, recipe) {
    // create sql query
    const fieldsRecipeTable = [];
    const valuesRecipeTable = [];
    Object.entries(recipe).forEach(([property, value]) => {
      fieldsRecipeTable.push(
        `recipe_${property} = $${1 + fieldsRecipeTable.length}`
      );
      valuesRecipeTable.push(recipe[property]);
    });
    console.log(fieldsRecipeTable);
    try {
      const updateRecipe = await dbClient.query(
        `UPDATE "rec_recipe" SET ${fieldsRecipeTable} WHERE "rec_recipe"."recipe_id" = ${recipeId} AND "rec_recipe"."user_id" = ${userId} RETURNING *`,
        valuesRecipeTable
      );
      return updateRecipe.rows[0];
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
