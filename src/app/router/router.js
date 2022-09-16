const router = require("express").Router();
const routerApi = require("../routes/index.js");

router.use("/api", routerApi);

router.use((request, response) => {
  response.status(404).send("Not found");
});

module.exports = router;
