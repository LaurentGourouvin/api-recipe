// Initialize AJV + Configuration
const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const ajv = new Ajv();
addFormats(ajv);

// Import schemas for AJV
const userSchema = require("./userSchema");
const ingredientSchema = require("./ingredientSchema");
const recipeSchema = require("./recipeSchema");
const loginUserSchema = require("./loginUserSchema");

ajv.addSchema(userSchema, "user");
ajv.addSchema(recipeSchema, "recipe");
ajv.addSchema(ingredientSchema, "ingredient");
ajv.addSchema(loginUserSchema, "login");

module.exports = ajv;
