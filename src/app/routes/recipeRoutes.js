const router = require("express").Router();
const recipeController = require("../controller/recipeController.js");
const middlewareValidationSchema = require("../middleware/middlewareValidationSchema.js");
const middlewareAuthenticate = require("../middleware/middlewareAuthenticate.js");
const middlewareSharp = require("../middleware/middlewareSharp.js");

const path = require("path");
const multer = require("multer");
const public = path.join(__dirname + "./../../public/recipe_images/");

// Fonctionne pour l'upload d'une image modification de taille ou d'extension
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // j'indique où stocker mon image
//     cb(null, public);
//   },
//   filename: (req, file, cb) => {
//     // Je génére un suffixe correspondant à Date.now()
//     const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//     // Je retourne une callback contenant le suffixe généré concaténé au nom original du fichier
//     cb(null, `${uniqueSuffix}_${file.originalname}`);
//   },
// });

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    const regex = /\.[a-z]*$/g;
    const fileFilter = file.originalname.match(regex)[0];
    if (
      fileFilter === ".png" ||
      fileFilter === ".jpg" ||
      fileFilter === ".webp" ||
      fileFilter === ".jpeg"
    ) {
      return cb(null, true);
    }
    return cb(new Error("Formats supportés : .png, .jpg, .webp et .jpeg "));
  },
});

/**
 * Une recette est créee à l'aide de ces paramètres
 * @typedef {object} recipe
 * @property {number} id - Id de la recette
 * @property {string} name - Nom de la recette
 * @property {string} description - Description de la recette
 * @property {string} files - URI de l'image - binary
 * @property {date} created_at - Date de création de la recette
 * @property {date} updated_at - Date de modification de la recette
 * @property {number} user_id - L'id de l'utilisateur qui a crée la recette
 */
/**
 * GET /api/recipe
 * @summary Obtenir la liste de tout les utilisateurs
 * @tags Recipe
 * @return {object} 200 - Récupération de la liste de toutes les recettes
 * @return {object} 204 - Aucune recette récupérée
 *  */
router.route("/").get(recipeController.getAll);

/**
 * GET /api/recipe/recipeById/{idRecipe}
 * @summary Obtenir une recette via son ID
 * @tags Recipe
 * @param {number}  idRecipe.path.required - ID de la recette
 * @return {object} 200 - Récupération de la recette
 * @return {object} 204 - Aucune recette récupérée
 *  */
router.route("/recipeById/:idRecipe").get(recipeController.getOneRecipeById);
/**
 * GET /api/recipe/recipeByUserId/{userId}
 * @summary Obtenir les recettes crées par une utilisateur
 * @tags Recipe
 * @param {number}  userId.path.required - ID de l'utilisateur
 * @return {object} 200 - Récupération des recettes
 * @return {object} 204 - Aucune recette récupérée
 *  */
router
  .route("/recipeByUserId/:idUser")
  .get(recipeController.getRecipesByUserId);

/**
 * POST /api/recipe/create
 * @summary Créer une nouvelle recette
 * @tags Recipe
 * @typedef {object} image
 * @property {string} files - nouvelle image - binary
 * @param {string} name.request.body.required - Nom de la recette
 * @param {string} description.request.body.required - Description de la recette
 * @param {image} image.request.body.required
 * @param {number} user_id.request.body.required - Id de l'utilisateur
 * @return {object} 200 - Récupération des recettes
 * @return {object} 204 - Aucune recette récupérée
 *  */
router
  .route("/create")
  .post(
    middlewareAuthenticate,
    upload.single("file"),
    middlewareSharp,
    middlewareValidationSchema("recipe"),
    recipeController.createRecipe
  );

/**
 * DELETE /api/recipe/delete
 * @summary Supprimer une recette
 * @tags Recipe
 * @param {number} idRecipe.path.required - Id de la recette à supprimer
 * @return {object} 200 - Récupération des recettes
 * @return {object} 404 - Impossible de supprimer la recette
 *  */
router
  .route("/delete/:recipeId")
  .delete(middlewareAuthenticate, recipeController.deleteRecipe);

/**
 * PATCH /api/recipe/update
 * @summary Mise à jour d'une recette
 * @tags Recipe
 * @param {string} name.request.body - Nom de la recette à modifier
 * @param {string} description.request.body - Description de la recette
 * @param {string} image.request.body - URI de l'image
 * @return {object} 200 - Modification d'une recette effectuée
 * @return {object} 404 - Impossible de modifier la recette
 *  */
router
  .route("/update")
  .patch(middlewareAuthenticate, recipeController.updateRecipe);

/**
 * GET /api/recipe/{nameRecipe}
 * @summary Recherche d'une recette
 * @tags Recipe
 * @param {string} name.request.body - Nom de la recette à modifier
 * @return {object} 200 - Une/Plusieurs recette correspondent à la recherche
 * @return {object} 404 - Impossible de modifier la recette
 *  */
router.route("/:search").get(recipeController.findRecipeByName);

/**
 * POST /api/recipe/uploadImage
 * @summary Add new image
 * @tags Images
 * @param {addImage} request.body.required - ajouter nouvelle image - multipart/form-data
 * @returns {object} 200 - Url of new image
 */
router
  .route("/uploadImage")
  .post(upload.single("files"), recipeController.uploadImageTest);
module.exports = router;
