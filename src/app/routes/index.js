const router = require("express").Router();

const userRoutes = require("./userRoutes.js");
const authRoutes = require("./authRoutes.js");
const recipeRoutes = require("./recipeRoutes.js");
const likeFavoritesRoutes = require("./likeFavorites.js");
const ingredientsRoutes = require("./ingredients.js");

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/recipe", recipeRoutes);
router.use("/likefavorites", likeFavoritesRoutes);
router.use("/ingredient", ingredientsRoutes);

module.exports = router;
