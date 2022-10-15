const dotenv = require("../utils/dotenv.js").getEnvConfig(
  __dirname,
  "../config/.env"
);
const sharp = require("sharp");
const path = require("path");

const public = path.join(__dirname + "./../../public/recipe_images/");

const middlewareSharp = async (request, response, next) => {
  console.log("je suis dans le middlewareSharp");

  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const nameMaxSize =
    "maxSize-" + request.file.originalname + uniqueSuffix + ".webp";
  const nameMediumSize =
    "medSize-" + request.file.originalname + uniqueSuffix + ".webp";
  const nameMinSize =
    "minSize-" + request.file.originalname + uniqueSuffix + ".webp";

  try {
    const maxSizeImage = sharp(request.file.buffer).toFile(
      public + "maxSize-" + request.file.originalname + uniqueSuffix + ".webp",
      (error, info) => {
        if (error) {
          response.status(500).json({
            message: "Problème lors de l'ajout de " + request.file.originalname,
          });
        }
      }
    );
    const medSizeImage = sharp(request.file.buffer)
      .resize(1024, 768)
      .toFile(
        public +
          "medSize-" +
          request.file.originalname +
          uniqueSuffix +
          ".webp",
        (error, info) => {
          if (error) {
            response.status(500).json({
              message:
                "Problème lors de l'ajout de " + request.file.originalname,
            });
          }
        }
      );
    const minSizeImage = sharp(request.file.buffer)
      .resize(200, 200)
      .toFile(
        public +
          "minSize-" +
          request.file.originalname +
          uniqueSuffix +
          ".webp",
        (error, info) => {
          if (error) {
            response.status(500).json({
              message:
                "Problème lors de l'ajout de " + request.file.originalname,
            });
          }
        }
      );

    request.file.maxSizeImage = nameMaxSize;
    request.file.mediumSizeImage = nameMediumSize;
    request.file.minSizeImage = nameMinSize;

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = middlewareSharp;
