const path = require("path");
module.exports = {
  getEnvConfig(dirname, pathToEnv) {
    return require("dotenv").config({ path: path.resolve(dirname, pathToEnv) });
  },
};
