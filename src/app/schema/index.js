// Initialize AJV + Configuration
const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const ajv = new Ajv();
addFormats(ajv);

// Import schemas for AJV
const userSchema = require("./userSchema");
const ingredientSchema = require("./ingredientSchema");
const recipeSchema = require("./recipeSchema");

ajv.addSchema(userSchema, "user");
ajv.addSchema(recipeSchema);
ajv.addSchema(ingredientSchema);

module.exports = ajv;
// module.exports = { validate_user, validate_recipe, validate_ingredient };
