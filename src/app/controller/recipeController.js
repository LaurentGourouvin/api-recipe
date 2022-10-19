const recipeDatamapper = require("../model/recipe.js");
const userDatamapper = require("../model/user.js");
const likeFavoritesDatamapper = require("../model/likeFavorites.js");
const ingredientDataMapper = require("../model/ingredients.js");
const path = require("path");
const fs = require("fs");
const public = path.join(__dirname + "./../../public/recipe_images/");
const dotenv = require("../utils/dotenv.js").getEnvConfig(__dirname, "../config/.env");

module.exports = {
  async getAll(_, response) {
    try {
      const allRecipe = await recipeDatamapper.getAll();
      if (allRecipe) {
        response.json(allRecipe);
      }
    } catch (error) {
      console.log(`🔴 Erreur dans ${path.basename(__filename)} 🔴`);
      console.log(error);
      response.status(error.httpResponseStatusCode).json({
        codeStatus: error.httpResponseStatusCode,
        errorDescription: error?.detail,
      });
    }
  },

  async getOneRecipeById(request, response) {
    const idRecipe = Number(request.params.idRecipe);
    try {
      const recipe = await recipeDatamapper.getOneRecipeById(idRecipe);
      if (!recipe) {
        return response.status(204).json({ message: "Aucune recette trouvé avec cet id" });
      }
      response.json(recipe);
    } catch (error) {
      console.log(`🔴 Erreur dans ${path.basename(__filename)} 🔴`);
      console.log(error);
      response.status(error.httpResponseStatusCode).json({
        codeStatus: error.httpResponseStatusCode,
        errorDescription: error?.detail,
      });
    }
  },

  async getRecipesByUserId(request, response) {
    const idUser = Number(request.params.idUser);
    try {
      const recipe = await recipeDatamapper.getRecipesByUserId(idUser);

      if (!recipe || recipe.length === 0) {
        return response.status(204).json({ message: "Aucune recette lié à cet utilisateur" });
      }
      response.status(200).json(recipe);
    } catch (error) {
      console.log(`🔴 Erreur dans ${path.basename(__filename)} 🔴`);
      console.log(error);
      response.status(error.httpResponseStatusCode).json({
        codeStatus: error.httpResponseStatusCode,
        errorDescription: error?.detail,
      });
    }
  },

  async createRecipe(request, response) {
    const { title, description, level, duration, person } = request.body;
    const userId = request.userId;
    const ingredientsList = [];

    // J'utilise Object.entries afin de parcourir mon objet contenu dans request.body
    // afin de récupérer ma liste d'ingrédient
    Object.entries(request.body).forEach((property) => {
      // Je vérifie que le nom de la propriété contient la string "ingredient_"
      if (property[0].includes("ingredient_")) {
        // J'ajoute à mon tableau la valeur correspondant à la proriété en cours de lecture
        // Je la JSON.parse afin d'obtenir un objet utilisable pour la suite de mes fonctions
        ingredientsList.push(JSON.parse(property[1]));
      }
    });

    const maxImageUrl = process.env.CONFIG_UPLOAD_PATH + request.file.maxSizeImage;
    const mediumImageUrl = process.env.CONFIG_UPLOAD_PATH + request.file.mediumSizeImage;
    const minImageUrl = process.env.CONFIG_UPLOAD_PATH + request.file.minSizeImage;

    try {
      const recipe = await recipeDatamapper.createRecipe(
        title,
        description,
        maxImageUrl,
        mediumImageUrl,
        minImageUrl,
        duration,
        person,
        level,
        userId
      );
      if (!recipe) {
        return response.status(404).json({ message: "Recette non créee." });
      }

      // Si ma recette est créer j'ajoute les ingrédients à la base de donnée
      for (const ingredient of ingredientsList) {
        try {
          const resultAddIngredient = await ingredientDataMapper.addIngredientToRecipe(recipe.recipe_id, ingredient);
        } catch (error) {
          // Si un problème survient lors de l'ajout des ingrédients, je supprime la recette
          const deleteRecipe = await recipeDatamapper.deleteRecipe(recipe.recipe_id, userId);
          if (!deleteRecipe || deleteRecipe.length === 0) {
            return response.status(404).json({ message: "Recette non supprimée." });
          }
          response.status(204).json(deleteRecipe);
        }
      }

      // // Une fois la recette crée, je vais ajouter une nouvelle ligne LikeFavorites à tout les utilisateurs.
      // const allUser = await userDatamapper.getAllIdUser();
      // if (allUser) {
      //   for (const user of allUser) {
      //     await likeFavoritesDatamapper.createLikeFavorite(
      //       recipe.recipe_id,
      //       user.user_id
      //     );
      //   }
      // }

      response.status(201).json(recipe);
    } catch (error) {
      // Je supprime les images si la recette n'as pu être crée
      // Je vérifie l'existance du fichier
      fs.stat(public + request.file.maxSizeImage, (err, stats) => {
        if (err) console.error(err);
        // si je n'ai pas d'erreur, je le supprime
        fs.unlink(public + request.file.maxSizeImage, (err) => {
          if (err) console.log(err);
          console.log("Suppression de l'image OK");
        });
      });
      fs.stat(public + request.file.mediumSizeImage, (err, stats) => {
        if (err) console.error(err);
        // si je n'ai pas d'erreur, je le supprime
        fs.unlink(public + request.file.mediumSizeImage, (err) => {
          if (err) console.log(err);
          console.log("Suppression de l'image OK");
        });
      });
      fs.stat(public + request.file.minSizeImage, (err, stats) => {
        if (err) console.error(err);
        // si je n'ai pas d'erreur, je le supprime
        fs.unlink(public + request.file.minSizeImage, (err) => {
          if (err) console.log(err);
          console.log("Suppression de l'image OK");
        });
      });
      console.log(`🔴 Erreur dans ${path.basename(__filename)} 🔴`);
      console.log(error);
      response.status(error.httpResponseStatusCode).json({
        codeStatus: error.httpResponseStatusCode,
        errorDescription: error?.detail,
      });
    }
  },

  async deleteRecipe(request, response) {
    const recipeId = Number(request.params.recipeId);
    const userId = request.userId;

    try {
      const deleteRecipe = await recipeDatamapper.deleteRecipe(recipeId, userId);

      if (!deleteRecipe || deleteRecipe.length === 0) {
        return response.status(404).json({ message: "Recette non supprimée." });
      }

      const maxImage = public + deleteRecipe[0].recipe_image_large.replace(process.env.CONFIG_UPLOAD_PATH, "");
      const medImage = public + deleteRecipe[0].recipe_image_medium.replace(process.env.CONFIG_UPLOAD_PATH, "");
      const minImage = public + deleteRecipe[0].recipe_image_small.replace(process.env.CONFIG_UPLOAD_PATH, "");

      // Je supprime les images de la recette
      // Je vérifie l'existance du fichier
      fs.stat(maxImage, (err, stats) => {
        if (err) console.error(err);
        // si je n'ai pas d'erreur, je le supprime
        fs.unlink(maxImage, (err) => {
          if (err) console.log(err);
          console.log("Suppression de l'image OK");
        });
      });
      fs.stat(medImage, (err, stats) => {
        if (err) console.error(err);
        // si je n'ai pas d'erreur, je le supprime
        fs.unlink(medImage, (err) => {
          if (err) console.log(err);
          console.log("Suppression de l'image OK");
        });
      });
      fs.stat(minImage, (err, stats) => {
        if (err) console.error(err);
        // si je n'ai pas d'erreur, je le supprime
        fs.unlink(minImage, (err) => {
          if (err) console.log(err);
          console.log("Suppression de l'image OK");
        });
      });
      response.status(204).json(deleteRecipe);
    } catch (error) {
      console.log(`🔴 Erreur dans ${path.basename(__filename)} 🔴`);
      console.log(error);
      response.status(error.httpResponseStatusCode).json({
        codeStatus: error.httpResponseStatusCode,
        errorDescription: error?.detail,
      });
    }
  },

  async updateRecipe(request, response) {
    const { recipeId } = request.body;
    const userId = request.userId;
    const recipe = {
      name: request.body.name,
      description: request.body.description,
    };

    try {
      const updateRecipe = await recipeDatamapper.updateRecipe(userId, recipeId, recipe);

      if (!updateRecipe) {
        return response.status(404).json({ message: "Recette non modifiée" });
      }

      response.status(200).json(recipe);
    } catch (error) {
      console.log(`🔴 Erreur dans ${path.basename(__filename)} 🔴`);
      console.log(error);
      response.status(error.httpResponseStatusCode).json({
        codeStatus: error.httpResponseStatusCode,
        errorDescription: error?.detail,
      });
    }
  },

  async findRecipeByName(request, response) {
    try {
      const searchResult = await recipeDatamapper.getRecipeByName(request.params.search);

      if (searchResult.length === 0) {
        return response.status(204).json({ message: "Aucune recette trouvé" });
      }

      response.status(200).json(searchResult);
    } catch (error) {
      console.log(`🔴 Erreur dans ${path.basename(__filename)} 🔴`);
      console.log(error);
      response.status(error.httpResponseStatusCode).json({
        codeStatus: error.httpResponseStatusCode,
        errorDescription: error?.detail,
      });
    }
  },

  async uploadImageTest(request, response) {
    try {
      console.log(request.body);
      console.log(request.file);

      response.status(200).json({ message: "test" });
    } catch (error) {
      console.log(`🔴 Erreur dans ${path.basename(__filename)} 🔴`);
      console.log(error);
      response.status(error.httpResponseStatusCode).json({
        codeStatus: error.httpResponseStatusCode,
        errorDescription: error?.detail,
      });
    }
  },
};
