const router = require("express").Router();

const userRoutes = require("./userRoutes.js");
const authRoutes = require("./authRoutes.js");

router.use("/auth", authRoutes);
router.use("/user", userRoutes);

module.exports = router;
