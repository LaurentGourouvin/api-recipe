const router = require("express").Router();

const userRoutes = require("./userRoutes.js");
const authRoutes = require("./authRoutes.js");
const recipeRoutes = require("./recipeRoutes.js");
const likeFavoritesRoutes = require("./likeFavorites.js");

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/recipe", recipeRoutes);
router.use("/likefavorites", likeFavoritesRoutes);

module.exports = router;
