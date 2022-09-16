// Initialize AJV + Configuration
const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const ajv = new Ajv();
addFormats(ajv);

// Import schemas for AJV
const userSchema = require("./userSchema");
const ingredientSchema = require("./ingredientSchema");
const recipeSchema = require("./recipeSchema");

// Compilation of schemas
const validate_user = ajv.compile(userSchema);
const validate_recipe = ajv.compile(recipeSchema);
const validate_ingredient = ajv.compile(ingredientSchema);

const user = {
  firstname: "laurent",
  lastname: "gourouvin",
  email: "gourouvin@gmail.com",
  password: "laurent",
};

const recipe = {
  id: 1,
  title: "Une gauffre au sucre",
  description: "Préparez-vous à déguster des gauffres au sucre parfaite !",
  userId: 2,
};

if (!validate_user(user)) console.log(validate_user.errors);
if (!validate_recipe(recipe)) console.log(validate_recipe.errors);
